import config from "@payload-config";
import { NextRequest } from "next/server";
import { getPayload, Where } from "payload";

// Helper to extract ID from value (handles both string IDs and populated objects)
function extractId(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "id" in value) {
    return String((value as { id: unknown }).id);
  }
  return undefined;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ payload: string[] }> }
) => {
  const payload = await getPayload({ config });
  const { payload: segments } = await params;

  const url = new URL(req.url);
  const collection = segments[0];
  const idOrAction = segments[1];

  try {
    // Handle /api/users/me
    if (collection === "users" && idOrAction === "me") {
      const token = req.cookies.get("payload-token")?.value;
      if (!token) {
        return Response.json({ user: null }, { status: 401 });
      }

      try {
        const { user } = await payload.auth({ headers: req.headers });
        return Response.json({ user });
      } catch {
        return Response.json({ user: null }, { status: 401 });
      }
    }

    if (idOrAction) {
      // Get single document
      const doc = await payload.findByID({
        collection,
        id: idOrAction,
        depth: parseInt(url.searchParams.get("depth") || "0"),
      });
      return Response.json(doc);
    } else {
      // Get collection
      const depth = parseInt(url.searchParams.get("depth") || "0");
      const limit = parseInt(url.searchParams.get("limit") || "10");

      const where: Where = {};

      const publishedParam = url.searchParams.get("where[published][equals]");
      if (publishedParam) {
        where.published = { equals: publishedParam === "true" };
      }

      const docs = await payload.find({
        collection,
        depth,
        limit,
        ...(Object.keys(where).length > 0 && { where }),
      });
      return Response.json(docs);
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("GET error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ payload: string[] }> }
) => {
  const payload = await getPayload({ config });
  const { payload: segments } = await params;
  const collection = segments[0];
  const action = segments[1];

  try {
    const body = await req.json();

    // Handle login
    if (action === "login") {
      const result = await payload.login({
        collection,
        data: body,
      });

      const response = Response.json({
        user: result.user,
        token: result.token,
      });
      if (result.token) {
        response.headers.set(
          "Set-Cookie",
          `payload-token=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
        );
      }
      return response;
    }

    // Handle logout
    if (action === "logout") {
      const response = Response.json({ message: "Logged out" });
      response.headers.set(
        "Set-Cookie",
        "payload-token=; Path=/; HttpOnly; Max-Age=0"
      );
      return response;
    }

    // Handle me (POST version)
    if (action === "me") {
      const token = req.cookies.get("payload-token")?.value;
      if (!token) {
        return Response.json({ user: null }, { status: 401 });
      }
      try {
        const { user } = await payload.auth({ headers: req.headers });
        return Response.json({ user });
      } catch {
        return Response.json({ user: null }, { status: 401 });
      }
    }

    // Get user for auth
    const token = req.cookies.get("payload-token")?.value;
    let user = null;
    if (token) {
      try {
        const authResult = await payload.auth({ headers: req.headers });
        user = authResult.user;
      } catch {
        // Not authenticated
      }
    }

    // Sanitize data - extract IDs from any populated relationship objects
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      const extractedId = extractId(value);
      if (extractedId && typeof value === "object") {
        // It was a populated object, use just the ID
        sanitizedData[key] = extractedId;
      } else {
        // Keep original value
        sanitizedData[key] = value;
      }
    }

    console.log("Creating document:", collection, sanitizedData);

    const doc = await payload.create({
      collection,
      data: sanitizedData,
      user,
    });
    return Response.json(doc);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("POST error:", message);
    return Response.json({ errors: [{ message }] }, { status: 400 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ payload: string[] }> }
) => {
  const payload = await getPayload({ config });
  const { payload: segments } = await params;
  const collection = segments[0];
  const id = segments[1];

  try {
    await payload.delete({
      collection,
      id,
    });
    return Response.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ payload: string[] }> }
) => {
  const payload = await getPayload({ config });
  const { payload: segments } = await params;
  const collection = segments[0];
  const id = segments[1];

  try {
    const body = await req.json();

    // Sanitize data - extract IDs from any populated relationship objects
    const sanitizedData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      const extractedId = extractId(value);
      if (extractedId && typeof value === "object") {
        sanitizedData[key] = extractedId;
      } else {
        sanitizedData[key] = value;
      }
    }

    const doc = await payload.update({
      collection,
      id,
      data: sanitizedData,
    });
    return Response.json(doc);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};
