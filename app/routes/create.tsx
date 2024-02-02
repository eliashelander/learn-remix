import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  session.flash("success", "Store created successfully!");

  return redirect(`/`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const CreateRoute: React.FC = () => {
  return (
    <div>
      <Form method="post">
        <button>Trigger success flash</button>
      </Form>
    </div>
  );
};

export default CreateRoute;
