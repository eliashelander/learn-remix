import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const successMessage = session.get("success") || null;

  return json(
    { successMessage },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Project where I learn Remix</h1>
    </div>
  );
}
