import { NextResponse } from "next/server";

export function middleware(request: { nextUrl: { clone: () => any } }) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // List of shallow routes
  const shallowRoutes = [
    "/teste-de-nivel-de-ingles/dados-cadastrais",
    "/teste-de-nivel-de-ingles/dados-escola",
    "/teste-de-nivel-de-ingles/instrucoes",
    "/teste-de-nivel-de-ingles/resultados",
    "/teste-de-nivel-de-ingles/frase-01",
    "/teste-de-nivel-de-ingles/frase-02",
    "/teste-de-nivel-de-ingles/frase-03",
    "/teste-de-nivel-de-ingles/frase-04",
    "/teste-de-nivel-de-ingles/frase-05",
    "/teste-de-nivel-de-ingles/frase-1",
    "/teste-de-nivel-de-ingles/frase-2",
    "/teste-de-nivel-de-ingles/frase-3",
    "/teste-de-nivel-de-ingles/frase-4",
    "/teste-de-nivel-de-ingles/frase-5",
  ];

  if (shallowRoutes.includes(pathname)) {
    url.pathname = "/teste-de-nivel-de-ingles/exercicios";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
