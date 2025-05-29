import { Metadata } from "next";
import ProviderComponent from "@components/EnglishTest/Provider";
import Header from "@components/EnglishTest/Header";

export const metadata: Metadata = {
  title: "Teste seu inglês com a KNN Idiomas Brasil",
  description:
    "Avalie sua pronúncia e compreensão em minutos: inicie sua avaliação agora e veja como você pode melhorar seu inglês com de feedback personalizado.",
};

const EnglishTestLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <ProviderComponent>
        <Header />
        {children}
        <footer>
          <small>
            © 2024 - KNN Idiomas Brasil. Todos os direitos reservados.
          </small>
        </footer>
      </ProviderComponent>
    </>
  );
};

export default EnglishTestLayout;
