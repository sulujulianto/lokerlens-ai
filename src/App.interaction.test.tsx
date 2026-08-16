// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { demoScenarios } from "./demoScenarios";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("App interactions", () => {
  it("switches demo profiles, renders the selected demo, and returns", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ ok: true, analysisAvailable: false }),
      ),
    );
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Analisis langsung belum dikonfigurasi");
    await user.click(
      screen.getByRole("button", { name: /Warehouse Staff/i }),
    );
    expect(screen.getByLabelText(/Lembaga pelatihan/)).toHaveProperty(
      "value",
      "Pelatihan internal usaha keluarga",
    );
    expect(screen.getByLabelText(/Kekuatan pribadi/)).toHaveProperty(
      "value",
      expect.stringContaining("Teliti menghitung barang"),
    );
    expect(screen.getByLabelText(/Tantangan utama saat melamar/)).toHaveProperty(
      "value",
      expect.stringContaining("sistem inventaris digital"),
    );
    await user.click(
      screen.getByRole("button", { name: "Tampilkan hasil demo terpilih" }),
    );

    expect(
      await screen.findByRole("heading", {
        name: "Hasil analisis kesiapan kerja",
      }),
    ).toBeTruthy();
    expect(screen.getByText(/Mode demo:/)).toBeTruthy();
    expect(
      screen.getByLabelText("Skor dan kesimpulan kesiapan").textContent,
    ).toContain("69/100");

    await user.click(
      screen.getByRole("button", { name: "Kembali ke formulir" }),
    );
    expect(screen.getByLabelText(/Peran yang ditargetkan/)).toHaveProperty(
      "value",
      "Warehouse Staff",
    );
    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole("button", {
          name: "Tampilkan hasil demo terpilih",
        }),
      ),
    );
  });

  it("clears a prefilled demo when starting a new form", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ ok: true, analysisAvailable: false }),
      ),
    );
    const user = userEvent.setup();
    render(<App />);

    await screen.findByText("Analisis langsung belum dikonfigurasi");
    expect(screen.getByLabelText(/Peran yang ditargetkan/)).toHaveProperty(
      "value",
      "Junior Frontend Developer",
    );

    await user.click(screen.getByRole("button", { name: "Form baru" }));

    expect(screen.getByLabelText(/Peran yang ditargetkan/)).toHaveProperty(
      "value",
      "",
    );
    expect(
      screen.getByRole("button", { name: "Pilih skenario demo dahulu" }),
    ).toHaveProperty("disabled", true);
  });

  it("submits a validated live profile and renders the normalized result", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({ ok: true, analysisAvailable: true }),
      )
      .mockResolvedValueOnce(jsonResponse(demoScenarios[0].analysis));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<App />);

    const liveButton = await screen.findByRole("button", {
      name: "Analisis kesiapan kerja",
    });
    await waitFor(() => expect(liveButton).toHaveProperty("disabled", false));
    await user.click(liveButton);

    expect(
      await screen.findByRole("heading", {
        name: "Hasil analisis kesiapan kerja",
      }),
    ).toBeTruthy();
    expect(screen.queryByText(/Mode demo:/)).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]?.[0]).toBe("/api/analyze");
  });
});
