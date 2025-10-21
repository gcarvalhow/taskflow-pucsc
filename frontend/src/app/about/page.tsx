import React from "react";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Sobre o Projeto</h1>
      <p className="mb-2">Este sistema foi desenvolvido para a disciplina de Gerenciamento, Configuração e Processos de Software.</p>
      <p className="mb-6">Colaboradores:</p>
      <ul className="list-disc pl-6">
        <li>Gabriel Carvalho</li>
        <li>Adrian Gonçalves</li>
        <li>Renato Colin</li>
        <li>Igor Thiago</li>
      </ul>
    </main>
  );
}
