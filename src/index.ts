let titulos: string[] = [];
const autores: string[] = [];
const anos: number[] = [];
const paginas: number[] = [];
const lido: boolean[] = [];
const avaliacoes: number[] = [];
 
titulos.push('O Hobbit',  'Clean Code',  '1984',  'Dom Casmurro',  'O Nome do Vento');
autores.push('J.R.R. Tolkien',  'Robert C. Martin',  'George Orwell',  'Machado de Assis',  'Patrick Rothfuss');
anos.push(1937,   2008,   1949,   1899,   2007);
paginas.push(310,   464,   328,   256,   662);
lido.push(true, true, false, true, false);
avaliacoes.push(5, 4, 0, 5, 0);

// Exibir biblioteca 
function exibirBiblioteca(): void {
  console.log("\n=== MINHA BIBLIOTECA ===\n");

  titulos.forEach((titulo, i) => {
    const status = lido[i]
      ? `LIDO (${avaliacoes[i]}/5)`
      : "PENDENTE";

    console.log(
      `${i + 1}. "${titulo}" (${anos[i]}) - ${autores[i]} - ${paginas[i]} pag - ${status}`
    );
  });
}

exibirBiblioteca();

//Cadastro e Remoção 
function adicionarLivro(titulo: string, autor: string, ano: number, paginasLivro: number): void {
  if (ano <= 0 || paginasLivro <= 0) {
    console.log("Dados inválidos");
    return;
  }

  titulos.push(titulo);
  autores.push(autor);
  anos.push(ano);
  paginas.push(paginasLivro);
  lido.push(false);
  avaliacoes.push(0);
}

function removerLivro(indice: number): void {
  titulos.splice(indice, 1);
  autores.splice(indice, 1);
  anos.splice(indice, 1);
  paginas.splice(indice, 1);
  lido.splice(indice, 1);
  avaliacoes.splice(indice, 1);
}

adicionarLivro("O Arqueiro e a Feiticeira", "Helena Gomes", 2009, 283);
adicionarLivro("O Principe Cruel", "Holly Black", 2018, 380);
const indice1984 = titulos.indexOf("1984");
if (indice1984 !== -1) {
  removerLivro(indice1984);
}

// Buscar e Listar
exibirBiblioteca();

function buscarPorTitulo(termo: string): number[] {
  return titulos
    .map((t, i) => t.toLowerCase().includes(termo.toLowerCase()) ? i : -1)
    .filter(i => i !== -1);
} 

function listarPorAutor(autor: string): string[] {
  return autores
    .map((a, i) => a === autor ? titulos[i] : null)
    .filter(t => t !== null) as string[];
}

// Marcar como lido e Avaliar
function marcarComoLido(indice: number, avaliacao: number): void {
  if (avaliacao < 1 || avaliacao > 5) {
    console.log("Avaliação inválida");
    return;
  }

  lido[indice] = true;
  avaliacoes[indice] = avaliacao;
}

function listarLidos(): string[] {
  return titulos.filter((_, i) => lido[i]);
} 

function listarPendentes(): string[] {
  return titulos.filter((_, i) => !lido[i]);
}

//Estatísticas
function totalLivros(): number {
  return titulos.length;
}

function totalLidos(): number {
  return lido.filter(v => v).length;
}

function percentualLidos(): number {
  return (totalLidos() / totalLivros()) * 100;
}

function mediaAvaliacoes(): number {
  const notas = avaliacoes.filter(n => n > 0);
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}

function livroMaiorAvaliacao(): string {
  let maior = 0;
  let titulo = "";

  avaliacoes.forEach((nota, i) => {
    if (nota > maior) {
      maior = nota;
      titulo = titulos[i] ?? "";  
    }
  });

  return titulo;
}

function totalPaginasLidas(): number {
  return paginas
    .filter((_, i) => lido[i])
    .reduce((a, b) => a + b, 0);
} 

//Por Década
function exibirPorDecada(): void {
  console.log("\n=== POR DECADA ===\n");

  const decadas: { [key: string]: string[] } = {};

  anos.forEach((ano, i) => {
    const decada = Math.floor(ano / 10) * 10 + "s";

    if (!decadas[decada]) {
      decadas[decada] = [];
    }


    decadas[decada].push(titulos[i]!);
  });

  for (const decada in decadas) {
    console.log(`${decada}: ${decadas[decada]!.join(", ")}`);
  }
}

//Final
exibirBiblioteca();

console.log("\n=== ESTATISTICAS ===\n");
console.log("Total:", totalLivros());
console.log("Lidos:", totalLidos());
console.log("Percentual:", percentualLidos().toFixed(2) + "%");
console.log("Média:", mediaAvaliacoes().toFixed(2));
console.log("Melhor livro:", livroMaiorAvaliacao());
console.log("Páginas lidas:", totalPaginasLidas());

exibirPorDecada();