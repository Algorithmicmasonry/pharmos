import LoginForm from "@/components/Forms/LoginForm";

export default async function page() {
 
  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
    <section>
      <LoginForm />
    </section>
  );
}
