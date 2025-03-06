import { addMessages } from "../redux/slices/messagesSlice";
import { store } from "../redux/store";

export async function fetchMessages() {
  const messages = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    redirect: "follow",
  }).then(res => res.json());

  store.dispatch(addMessages(messages.map((m: { _id: string, message: string }) => m.message)));
}