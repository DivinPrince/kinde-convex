import { TasksUi } from "@/components/tasks-ui";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function Tasks() {
  return (
    <TasksUi />
  );
}