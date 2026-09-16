import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductForm from "./ProductForm";
import { uploadProductImage } from "../services/imageUploadService";

vi.mock("../services/imageUploadService", () => ({
  uploadProductImage: vi.fn(),
}));

describe("ProductForm", () => {
  it("usa el servicio de imagen sin realizar un upload real", async () => {
    vi.mocked(uploadProductImage).mockResolvedValue(
      "https://example.com/image.jpg",
    );

    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <ProductForm
        submitLabel="Crear producto"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "Collar" },
    });

    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Collar para perro" },
    });

    fireEvent.change(screen.getByLabelText(/precio/i), {
      target: { value: "3000" },
    });

    fireEvent.change(screen.getByLabelText(/categoría/i), {
      target: { value: "Accesorios" },
    });

    fireEvent.change(screen.getByLabelText(/stock/i), {
      target: { value: "5" },
    });

    const file = new File(["image"], "collar.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByLabelText(/imagen/i), {
      target: { files: [file] },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Crear producto",
      }),
    );

    await waitFor(() => {
      expect(uploadProductImage).toHaveBeenCalledWith(file);
    });

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Collar",
        imageUrl: "https://example.com/image.jpg",
      }),
    );
  });
});