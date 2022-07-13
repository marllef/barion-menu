import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import { RoundedButton } from "~/components/Buttons/Rounded";
import { Input } from "~/components/Inputs/Input";
import { Link } from "~/components/Link";
import { VStack } from "~/components/Stack/VStack";
import { useAuth } from "~/hooks/useAuth";
import { LoginCredentials, loginSchema } from "~/utils/schemas/loginSchema";
import { showError } from "~/utils/toastfy/toasts";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const formRef = useRef<FormHandles>(null);
  const { auth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/admin");
  }, [user]);

  async function handleSubmit(data: LoginCredentials) {
    try {
      const validated = await loginSchema.validate(data, { abortEarly: false });
      const authenticated = await auth?.signIn(validated);

      if (authenticated) {
        navigate("/admin");
      }
    } catch (err: any) {
      if (err instanceof ValidationError) {
        const vErrors: any = {};
        err.inner.forEach((error) => {
          if (error.path) vErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(vErrors);
      } else {
        showError(err.message);
      }
    }
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.midCard}`}>
        <Form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.formTitle}>Bem-vindo</span>
          <VStack>
            <Input
              className="w-full"
              name="email"
              type={"email"}
              placeholder="Digite o email..."
              label="Email"
            />
            <Input
              className="w-full"
              name="password"
              type={"password"}
              label="Senha"
              placeholder="Digite a senha..."
            />
          </VStack>
          <RoundedButton className="w-full mt-6">Entrar</RoundedButton>
        </Form>
        <span className="pt-7 text-slate-500 text-center">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:text-sky-500 font-semibold"
          >
            Cadastre-se
          </Link>
        </span>
      </div>
    </div>
  );
};
