import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { commitSession, getSession } from "./sessions";
import { NotificationModal } from "./components/NotificationModal";
import { Header } from "./components/Header";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

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

export default function App() {
  const { successMessage } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isBusy =
    navigation.state == "loading" || navigation.state == "submitting";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        {successMessage && !isBusy && (
          <NotificationModal message={successMessage} />
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
