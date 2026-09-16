import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSignedUrl: vi.fn(),
  verifyIdToken: vi.fn(),
  getUser: vi.fn(),
}));

vi.mock("@aws-sdk/client-s3", () => ({
  S3Client: class {},
  PutObjectCommand: class {
    constructor() {}
  },
}));

vi.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: mocks.getSignedUrl,
}));

vi.mock("./firebaseAdmin.js", () => ({
  getFirebaseAdmin: vi.fn(async () => ({
    adminAuth: {
      verifyIdToken: mocks.verifyIdToken,
    },
    adminDb: {
      collection: vi.fn(() => ({
        doc: vi.fn(() => ({
          get: mocks.getUser,
        })),
      })),
    },
  })),
}));

import handler from "./generateUploadUrl.js";

function createResponse() {
  const json = vi.fn();
  const status = vi.fn(() => ({ json }));

  return { status, json };
}

describe("generateUploadUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.verifyIdToken.mockResolvedValue({ uid: "admin-1" });

    mocks.getUser.mockResolvedValue({
      exists: true,
      data: () => ({ role: "admin" }),
    });

    mocks.getSignedUrl.mockResolvedValue(
      "https://mock-s3-url.example.com",
    );
  });

  it("genera una presigned URL sin llamar a AWS real", async () => {
    const request = {
      method: "POST",
      headers: {
        authorization: "Bearer fake-token",
      },
      body: {
        fileName: "producto.jpg",
        fileType: "image/jpeg",
      },
    };

    const response = createResponse();

    await handler(request, response);

    expect(mocks.verifyIdToken).toHaveBeenCalledWith("fake-token");
    expect(mocks.getSignedUrl).toHaveBeenCalledOnce();
    expect(response.status).toHaveBeenCalledWith(200);

    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        uploadUrl: "https://mock-s3-url.example.com",
      }),
    );
  });
});