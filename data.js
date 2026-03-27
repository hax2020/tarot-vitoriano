// data.js
// Versão híbrida: descrições curtas, jogáveis e baseadas no PDF.
// Ordem dos naipes customizados:
// 23–36 Investigador
// 37–50 Primordial
// 51–64 Dinâmica
// 65–78 Padrão

const tarotData = [];

function formatText(bloco, essencia) {
  return [
    bloco.frase,
    "",
    `Significado: ${bloco.significado}`,
    `Influência: ${bloco.influencia}`,
    `Essência: ${essencia}`
  ].join("\n");
}

function createCard(nome, normal, invertido, essencia) {
  return { nome, normal, invertido, essencia };
}

const RAW_CARDS = [
  // 1–22 Arcanos Maiores
  createCard(
    "O Louco",
    {
      frase: "Movido por um êxtase cego, ele avança rumo ao desconhecido como se o destino já lhe pertencesse.",
      significado: "Possibilidade",
      influencia: "Início de jornada, coragem temerária, salto de fé, risco assumido sem plena medida."
    },
    {
      frase: "A aventura perde o rumo, e o explorador se torna refém da própria imprudência.",
      significado: "Estagnação",
      influencia: "Tolo arrojo, descuido, desastre por arrogância, passo em falso para o abismo."
    },
    "Arcano Maior — impulso, escolha e abertura para o desconhecido."
  ),
  createCard(
    "O Mago",
    {
      frase: "O artífice reúne ideia, ciência e vontade para impor forma ao caos e criar o impossível.",
      significado: "Vontade",
      influencia: "Manifestação, foco, invenção, clareza mental, poder de realizar."
    },
    {
      frase: "A criação sai do controle, e a vontade degenera em húbris e experimento amaldiçoado.",
      significado: "Fraqueza",
      influencia: "Manipulação falha, excesso de ego, perda de controle, talento usado sem ética."
    },
    "Arcano Maior — consciência, técnica e poder de moldar a realidade."
  ),
  createCard(
    "A Sacerdotisa",
    {
      frase: "Do outro lado do véu, ela escuta o que a razão não alcança e governa o mistério em silêncio.",
      significado: "Iluminação",
      influencia: "Intuição, segredo, sabedoria oculta, percepção sutil, escuta interior."
    },
    {
      frase: "O mistério vira espetáculo, e o sagrado se corrompe em fraude e vaidade espiritual.",
      significado: "Conhecimento Falso",
      influencia: "Charlatanismo, ilusão, histeria, ocultismo vazio, engano travestido de revelação."
    },
    "Arcano Maior — mistério, intuição e conhecimento velado."
  ),
  createCard(
    "A Imperatriz",
    {
      frase: "Ela nutre a terra, a vida e a ordem do mundo, fazendo prosperar tudo o que toca.",
      significado: "Fertilidade",
      influencia: "Criação, abundância, cura, equilíbrio, florescimento material e espiritual."
    },
    {
      frase: "A fonte seca, e a mãe nutridora revela um rosto de escassez, exaustão e fome.",
      significado: "Esterilidade",
      influencia: "Bloqueio criativo, carência, desgaste, pobreza, ruptura dos ciclos de crescimento."
    },
    "Arcano Maior — criação, abundância e sustentação da vida."
  ),
  createCard(
    "O Imperador",
    {
      frase: "Sentado sobre a estrutura do mundo, ele comanda pela lei, pela razão e pela força organizada.",
      significado: "Governo",
      influencia: "Autoridade, estabilidade, liderança, decisão firme, construção de ordem."
    },
    {
      frase: "A ordem endurece até virar tirania, e o poder se exerce como opressão sem justiça.",
      significado: "Tirania",
      influencia: "Autoritarismo, rigidez, abuso de poder, crueldade administrativa, dominação."
    },
    "Arcano Maior — estrutura, autoridade e domínio institucional."
  ),
  createCard(
    "O Hierofante",
    {
      frase: "Ele guarda a moral, o rito e a doutrina que mantêm unido o edifício da sociedade.",
      significado: "Moralidade",
      influencia: "Tradição, ensino, iniciação, conformidade, orientação dentro de uma ordem maior."
    },
    {
      frase: "A instituição revela sua hipocrisia, e a fé se converte em controle, credulidade e doutrinação.",
      significado: "Credulidade",
      influencia: "Dogma vazio, corrupção moral, falsa santidade, submissão espiritual, opressão."
    },
    "Arcano Maior — tradição, doutrina e vínculo com a ordem sagrada."
  ),
  createCard(
    "Os Enamorados",
    {
      frase: "Dois mundos se atraem com intensidade suficiente para desafiar dever, classe e destino.",
      significado: "Atração",
      influencia: "Escolha afetiva, vínculo profundo, dualidade, paixão, lealdade colocada à prova."
    },
    {
      frase: "O vínculo se rompe em escândalo, traição e desejo que cobra um preço alto demais.",
      significado: "Repulsão",
      influencia: "Conflito amoroso, ruptura, caso ilícito, votos quebrados, consequência amarga."
    },
    "Arcano Maior — vínculo, escolha e integração dos opostos."
  ),
  createCard(
    "A Carruagem",
    {
      frase: "A vontade ganha rodas, vapor e direção, avançando como progresso em marcha triunfal.",
      significado: "Triunfo",
      influencia: "Movimento, conquista, disciplina, progresso, avanço decidido."
    },
    {
      frase: "O veículo perde o controle, e o mesmo ímpeto que elevava agora conduz ao colapso.",
      significado: "Derrota",
      influencia: "Acidente, descarrilamento, excesso de velocidade, falha de domínio, ruína do impulso."
    },
    "Arcano Maior — movimento, conquista e domínio da vontade."
  ),
  createCard(
    "A Força",
    {
      frase: "A verdadeira potência doma a besta sem esmagá-la, transformando instinto em disciplina viva.",
      significado: "Força",
      influencia: "Autocontrole, coragem serena, magnetismo, firmeza interior, domínio de si."
    },
    {
      frase: "A fera escapa da rédea, e a potência se corrompe em brutalidade e perda de controle.",
      significado: "Fraqueza",
      influencia: "Raiva, abuso, selvageria, impulso cru, colapso da disciplina interior."
    },
    "Arcano Maior — autocontrole, coragem e domínio do instinto."
  ),
  createCard(
    "O Eremita",
    {
      frase: "Longe do ruído do mundo, ele busca a verdade em silêncio, estudo e contemplação.",
      significado: "Orientação",
      influencia: "Pesquisa, introspecção, prudência, sabedoria, retiro produtivo."
    },
    {
      frase: "O isolamento deixa de iluminar e passa a aprisionar, alimentando obsessão e alienação.",
      significado: "Imaturidade",
      influencia: "Retraimento excessivo, fuga da realidade, esterilidade mental, isolamento improdutivo."
    },
    "Arcano Maior — introspecção, busca e sabedoria solitária."
  ),
  createCard(
    "A Roda da Fortuna",
    {
      frase: "As engrenagens do destino giram sem pedir licença, elevando e derrubando impérios e vidas.",
      significado: "Destino",
      influencia: "Mudança inevitável, ciclos, oportunidade, reviravolta, sorte em movimento."
    },
    {
      frase: "A roda desce com estrondo, trazendo colapso, azar e o peso cruel da virada desfavorável.",
      significado: "Azar",
      influencia: "Queda, crise, pobreza, instabilidade, ciclo negativo que exige resistência."
    },
    "Arcano Maior — ciclos, acaso e mutação inevitável do destino."
  ),
  createCard(
    "A Justiça",
    {
      frase: "A espada corta ilusões, e a balança exige verdade, proporção e consequência exata.",
      significado: "Justiça",
      influencia: "Equilíbrio, discernimento, ordem, responsabilidade, veredito claro."
    },
    {
      frase: "A lei se desvia da verdade e passa a servir à opressão, ao preconceito e à parcialidade.",
      significado: "Injustiça",
      influencia: "Desequilíbrio, abuso institucional, viés, julgamento falso, estrutura corrompida."
    },
    "Arcano Maior — verdade, equilíbrio e consequência."
  ),
  createCard(
    "O Enforcado",
    {
      frase: "Ao suspender o passo, ele ganha uma visão que só o sacrifício pode revelar.",
      significado: "Perspectiva",
      influencia: "Rendição, pausa, nova visão, revelação, aceitação do preço da mudança."
    },
    {
      frase: "A suspensão deixa de ser insight e vira vício, fuga e paralisia sem propósito.",
      significado: "Preocupação",
      influencia: "Escapismo, estagnação, dependência, sacrifício inútil, torpor."
    },
    "Arcano Maior — suspensão, visão e troca de perspectiva."
  ),
  createCard(
    "A Morte",
    {
      frase: "Uma era precisa tombar para que outra possa nascer com verdade e força renovadas.",
      significado: "Renovação",
      influencia: "Fim necessário, transição, purificação, encerramento, renascimento."
    },
    {
      frase: "O que devia morrer insiste em permanecer, e a recusa da mudança apodrece a alma.",
      significado: "Inércia",
      influencia: "Estagnação, medo do novo, decadência, apego ao obsoleto, necrose de ciclos."
    },
    "Arcano Maior — fim, transição e renascimento."
  ),
  createCard(
    "A Temperança",
    {
      frase: "Ela une opostos sem anulá-los, fazendo da medida e da síntese uma arte de transformação.",
      significado: "Adaptação",
      influencia: "Equilíbrio, integração, conciliação, diplomacia, composição harmoniosa."
    },
    {
      frase: "Quando a medida falha, a busca por pureza vira fanatismo e conflito destrutivo.",
      significado: "Competição",
      influencia: "Excesso, radicalismo, intolerância, desequilíbrio, mistura instável."
    },
    "Arcano Maior — síntese, equilíbrio e adaptação."
  ),
  createCard(
    "O Diabo",
    {
      frase: "Os grilhões do mundo material se fecham quando desejo, vício e exploração tomam o trono.",
      significado: "Servidão",
      influencia: "Aprisionamento, tentação, dependência, exploração, materialismo opressor."
    },
    {
      frase: "Ao perceber as correntes, nasce a chance de quebrá-las e retomar a própria vontade.",
      significado: "Liberdade",
      influencia: "Libertação, consciência, ruptura de vícios, rebelião interior, autonomia."
    },
    "Arcano Maior — tentação, servidão e confronto com os grilhões."
  ),
  createCard(
    "A Torre",
    {
      frase: "A estrutura apodrecida desaba de uma vez, e o caos limpa o terreno para a verdade.",
      significado: "Purificação",
      influencia: "Ruptura súbita, colapso, choque, revelação violenta, destruição necessária."
    },
    {
      frase: "Em vez de cair, a estrutura endurece e vira prisão, retendo conflito e sufocando mudança.",
      significado: "Prisão",
      influencia: "Opressão, controle, tirania, contenção do inevitável, rachadura reprimida."
    },
    "Arcano Maior — colapso, revelação e quebra de estruturas falsas."
  ),
  createCard(
    "A Estrela",
    {
      frase: "Depois das trevas, uma luz limpa aponta o caminho e reacende a confiança no porvir.",
      significado: "Inspiração",
      influencia: "Esperança, renovação, criatividade, fé no futuro, orientação luminosa."
    },
    {
      frase: "O brilho engana, e a promessa do amanhã se dissolve em ilusão, cansaço e falsa esperança.",
      significado: "Desilusão",
      influencia: "Pessimismo, decepção, promessa vazia, desânimo, horizonte encoberto."
    },
    "Arcano Maior — esperança, inspiração e visão de futuro."
  ),
  createCard(
    "A Lua",
    {
      frase: "Sob a névoa do inconsciente, medos, pressentimentos e mistérios falam mais alto que a razão.",
      significado: "Intuição",
      influencia: "Subconsciente, sensibilidade, simbolismo, sonho, verdade velada."
    },
    {
      frase: "A névoa se adensa até virar paranoia, engano e ameaça sem contorno seguro.",
      significado: "Decepção",
      influencia: "Confusão, medo difuso, inimigos ocultos, ilusão, desorientação."
    },
    "Arcano Maior — mistério, subconsciente e percepção do invisível."
  ),
  createCard(
    "O Sol",
    {
      frase: "Tudo se torna claro sob sua luz: vigor, sucesso, realização e a alegria de existir sem sombras.",
      significado: "Libertação",
      influencia: "Vitalidade, êxito, clareza, celebração, expansão luminosa."
    },
    {
      frase: "A luz excessiva cega, exaure e revela o preço da arrogância sustentada por brilho demais.",
      significado: "Depleção",
      influencia: "Cansaço, orgulho, exposição destrutiva, excesso, queda depois do auge."
    },
    "Arcano Maior — clareza, vitalidade e triunfo manifesto."
  ),
  createCard(
    "O Julgamento",
    {
      frase: "A trombeta chama para o acerto de contas, despertando o que já não pode permanecer adormecido.",
      significado: "Reunião",
      influencia: "Chamado, despertar, revisão profunda, responsabilidade histórica, decisão final."
    },
    {
      frase: "O passado pesa como culpa, e o chamado à renovação é recusado por medo ou remorso.",
      significado: "Culpa",
      influencia: "Estagnação moral, negação, repetição de erros, assombração do passado, atraso do despertar."
    },
    "Arcano Maior — despertar, chamado e acerto de contas."
  ),
  createCard(
    "O Mundo",
    {
      frase: "A grande obra se completa, e tudo se revela conectado dentro de uma totalidade viva.",
      significado: "Realização",
      influencia: "Conclusão, integração, plenitude, domínio de conjunto, fechamento bem-sucedido."
    },
    {
      frase: "A totalidade se rompe, e a rede que unia tudo cede lugar à fragmentação e ao isolamento.",
      significado: "Incompletude",
      influencia: "Desconexão, colapso, limitação, dispersão, obra interrompida."
    },
    "Arcano Maior — conclusão, integração e plenitude."
  ),

  // 23–36 Investigador (baseado no bloco de Investigador do PDF: 65–78)
  createCard(
    "Ás de Investigador",
    {
      frase: "Uma centelha acende a alma e inaugura um impulso criador impossível de ignorar.",
      significado: "Inspiração",
      influencia: "Início de ação, coragem criativa, vontade desperta, impulso de transformação."
    },
    {
      frase: "A chama falha ao nascer, e o que era impulso vira bloqueio, atraso e frustração.",
      significado: "Potencial Bloqueado",
      influencia: "Falso começo, desânimo, energia travada, incapacidade de agir."
    },
    "Investigador (Fogo) — busca pela Ascensão, criação ativa e transmutação da realidade."
  ),
  createCard(
    "2 de Investigador",
    {
      frase: "O mundo está sobre a mesa, e a mente calcula como conquistá-lo sem desperdiçar um só movimento.",
      significado: "Planejamento Estratégico",
      influencia: "Domínio, visão ampla, controle, decisão entre caminhos, articulação de poder."
    },
    {
      frase: "O plano paralisa diante do desconhecido, e a ambição recua para dentro da própria torre.",
      significado: "Medo",
      influencia: "Insegurança estratégica, fuga, perda de domínio, projeto abandonado antes da execução."
    },
    "Investigador (Fogo) — intenção dirigida, estratégia e expansão da vontade."
  ),
  createCard(
    "3 de Investigador",
    {
      frase: "A visão ganha pernas, parceiros e rota; aquilo que foi planejado começa a se expandir com método.",
      significado: "Expansão",
      influencia: "Cooperação, missão bem conduzida, retorno inicial, avanço coordenado."
    },
    {
      frase: "A extensão excessiva rompe alianças e expõe a arrogância de quem acreditou controlar tudo.",
      significado: "Arrogância",
      influencia: "Superextensão, falha de parceria, atraso, ruína de um avanço mal medido."
    },
    "Investigador (Fogo) — expansão, liderança e realização da visão no mundo."
  ),
  createCard(
    "4 de Investigador",
    {
      frase: "O salão se abre em celebração, e a ordem do grupo acolhe o indivíduo numa harmonia conquistada.",
      significado: "Celebração",
      influencia: "Integração, rito de passagem, comunidade, segurança, conclusão feliz."
    },
    {
      frase: "A porta se fecha, e aquilo que era acolhimento vira exclusão, desprezo e instabilidade social.",
      significado: "Exclusão",
      influencia: "Marginalização, conflito doméstico, rejeição, rito falho, não pertencimento."
    },
    "Investigador (Fogo) — comunidade, ordem social e calor de pertencimento."
  ),
  createCard(
    "5 de Investigador",
    {
      frase: "O debate se acende como duelo de egos, onde rivalidade e brilho intelectual se chocam sem trégua.",
      significado: "Debate",
      influencia: "Conflito criativo, disputa, tensão, competição, atrito produtivo."
    },
    {
      frase: "A disputa se envenena e abandona o mérito, descendo ao litígio, à fraude e à sabotagem.",
      significado: "Litígio",
      influencia: "Trapaça, amargura, destruição do diálogo, rivalidade corrupta, conflito improdutivo."
    },
    "Investigador (Fogo) — confronto criativo, afirmação e prova de poder."
  ),
  createCard(
    "6 de Investigador",
    {
      frase: "O retorno é triunfal: a conquista é reconhecida e a vontade recebe o aplauso do mundo.",
      significado: "Vitória",
      influencia: "Reconhecimento, fama, avanço de posição, sucesso validado, aclamação."
    },
    {
      frase: "A glória revela sua falsidade, e o vencedor percebe que vestia a máscara do impostor.",
      significado: "Impostor",
      influencia: "Queda de reputação, triunfo oco, vergonha, ilusão de sucesso, desmascaramento."
    },
    "Investigador (Fogo) — triunfo, afirmação pública e coroação do mérito."
  ),
  createCard(
    "7 de Investigador",
    {
      frase: "A posição é defendida com elegância e fibra, sustentada por foco, estratégia e dignidade.",
      significado: "Resiliência",
      influencia: "Defesa de território, firmeza, autopreservação, coragem sutil, manutenção da posição."
    },
    {
      frase: "A defesa cede, a máscara cai e resta a exaustão de quem já não consegue sustentar a linha.",
      significado: "Exaustão",
      influencia: "Rendição, vulnerabilidade, desgaste, desmoralização, quebra da resistência."
    },
    "Investigador (Fogo) — resistência, honra e manutenção do espaço conquistado."
  ),
  createCard(
    "8 de Investigador",
    {
      frase: "A mensagem corre pelos fios do mundo, ligando ação, ideia e velocidade num só impulso.",
      significado: "Progresso",
      influencia: "Comunicação, transmissão rápida, tecnologia, resposta imediata, avanço de informação."
    },
    {
      frase: "Os fios se rompem e o fluxo se perde em ruído, atraso, interferência e discussão.",
      significado: "Discussão",
      influencia: "Falha de comunicação, interrupção, incompreensão, estagnação do movimento."
    },
    "Investigador (Fogo) — impulso em movimento, comunicação e realização veloz."
  ),
  createCard(
    "9 de Investigador",
    {
      frase: "A paliçada ergue-se como proteção viva, delimitando um perímetro de ordem contra o caos exterior.",
      significado: "Proteção",
      influencia: "Vigilância, resiliência, guarda, defesa organizada, segurança conquistada."
    },
    {
      frase: "A barreira cede e a fronteira é violada, deixando tudo exposto ao medo e ao colapso.",
      significado: "Vulnerabilidade",
      influencia: "Brecha, invasão, falha defensiva, perda de segurança, desamparo."
    },
    "Investigador (Fogo) — fortificação da vontade e defesa consciente do que importa."
  ),
  createCard(
    "10 de Investigador",
    {
      frase: "A estrutura que devia proteger torna-se cárcere, e o fardo do dever pesa até o limite.",
      significado: "Opressão",
      influencia: "Sobrecarga, retenção, prisão de dogmas, peso insustentável, sufocamento estrutural."
    },
    {
      frase: "Uma fenda aparece na madeira da prisão, anunciando a primeira rachadura da libertação.",
      significado: "Fissura",
      influencia: "Quebra de padrões, deserção, ruptura inicial, libertação dolorosa, começo da fuga."
    },
    "Investigador (Fogo) — excesso de dever, tensão e prova final da vontade."
  ),
  createCard(
    "Pajem de Investigador",
    {
      frase: "A mensageira corre para o mundo com fome de liberdade, aprendizado e descoberta.",
      significado: "Coragem Disfarçada",
      influencia: "Curiosidade, ousadia jovem, notícia, libertação inicial, desejo de experimentar."
    },
    {
      frase: "O disfarce pesa mais que a liberdade, e a aventura se corrompe em medo de ser revelada.",
      significado: "Farsa",
      influencia: "Ansiedade, fingimento, segredo, insegurança, paralisia por exposição."
    },
    "Investigador (Fogo) — juventude ardente, notícia, impulso e identidade em formação."
  ),
  createCard(
    "Cavaleiro de Investigador",
    {
      frase: "O ideal cavalga em velocidade máxima, disposto a ferir a história para abrir caminho ao novo.",
      significado: "Conflito",
      influencia: "Audácia, revolução, ofensiva, ímpeto, luta por um ideal."
    },
    {
      frase: "Sem ideal, sobra apenas a brutalidade da carga cega e da valentia vazia.",
      significado: "Violência",
      influencia: "Impulsividade destrutiva, brutalidade, divisão, luta sem propósito, derrota moral."
    },
    "Investigador (Fogo) — ação ofensiva, expansão e ideal ardente."
  ),
  createCard(
    "Rainha de Investigador",
    {
      frase: "Ela conduz pessoas e emoções como quem rege uma orquestra, dominando o salão com carisma.",
      significado: "Controle",
      influencia: "Influência, magnetismo, comando social, estratégia relacional, presença soberana."
    },
    {
      frase: "Quando perde o compasso, o encanto vira ciúme, manipulação e descontrole público.",
      significado: "Perda de Controle",
      influencia: "Paranoia social, instabilidade, isolamento, engano evidente, colapso de imagem."
    },
    "Investigador (Fogo) — comando carismático, expressão e domínio da cena."
  ),
  createCard(
    "Rei de Investigador",
    {
      frase: "O grão-mestre lidera com visão, disciplina interior e uma autoridade que nasce da sabedoria.",
      significado: "Autoridade",
      influencia: "Liderança inspirada, direção, paternidade espiritual, visão estratégica, ensino."
    },
    {
      frase: "A sabedoria endurece em dogma, e o líder se converte em ditador de regras mortas.",
      significado: "Autoritarismo",
      influencia: "Rigidez, intolerância, medo, severidade, comando sem escuta nem renovação."
    },
    "Investigador (Fogo) — liderança, visão e autoridade da vontade desperta."
  ),

  // 37–50 Primordial (baseado no bloco de Primordialismo do PDF: 51–64)
  createCard(
    "Ás de Primordial",
    {
      frase: "Uma fonte interior se abre, deixando o coração transbordar sentimento, devoção e vida.",
      significado: "Avanço",
      influencia: "Abertura emocional, amor puro, início afetivo, fluxo espiritual, sensibilidade desperta."
    },
    {
      frase: "A fonte se contamina, e a emoção antes viva se transforma em secura e bloqueio.",
      significado: "Bloqueio Emocional",
      influencia: "Repressão, coração fechado, amargura, desconfiança, falta de fluxo afetivo."
    },
    "Primordial (Água) — desejo, instinto, força vital e profundidade emocional."
  ),
  createCard(
    "2 de Primordial",
    {
      frase: "Dois vasos se reconhecem, e o encontro produz um pacto de alma, desejo e reciprocidade.",
      significado: "União",
      influencia: "Parceria, atração mútua, conexão afetiva, acordo íntimo, espelhamento."
    },
    {
      frase: "O espelho se parte, e a ligação antes sagrada degenera em afastamento e desconfiança.",
      significado: "Ruptura",
      influencia: "Separação, desentendimento, quebra de confiança, divórcio, afastamento afetivo."
    },
    "Primordial (Água) — vínculo, reciprocidade e fusão emocional."
  ),
  createCard(
    "3 de Primordial",
    {
      frase: "O cálice se ergue em comunhão, e a alegria se multiplica quando o afeto encontra comunidade.",
      significado: "Comunhão",
      influencia: "Amizade, celebração, grupo, apoio mútuo, pertencimento emocional."
    },
    {
      frase: "A roda da celebração se contamina, e o grupo cai em escândalo, fofoca e exclusão.",
      significado: "Exclusão",
      influencia: "Ciúme, excesso, ruptura social, intriga, deterioração de vínculos."
    },
    "Primordial (Água) — partilha afetiva, celebração e coesão do grupo."
  ),
  createCard(
    "4 de Primordial",
    {
      frase: "A taça oferecida passa despercebida; o coração recolhe-se num tédio que o afasta do presente.",
      significado: "Apatia",
      influencia: "Ennui, isolamento, insatisfação, contemplação estéril, recusa de oportunidades."
    },
    {
      frase: "De repente o torpor se rompe, e o que parecia sem cor ressurge como chance viva.",
      significado: "Despertar",
      influencia: "Renovação emocional, nova chance, reengajamento, maravilha, retorno do interesse."
    },
    "Primordial (Água) — desejo interno, recepção emocional e abertura ao sentir."
  ),
  createCard(
    "5 de Primordial",
    {
      frase: "O olhar fixa-se nos cálices tombados, e a dor ocupa todo o espaço do mundo.",
      significado: "Luto",
      influencia: "Perda, tristeza, arrependimento, desilusão, mergulho na ausência."
    },
    {
      frase: "Quando o olhar enfim se ergue, percebe-se que ainda restam vasos em pé e caminho adiante.",
      significado: "Esperança",
      influencia: "Recuperação, aceitação, reconstrução, resiliência, retorno gradual à vida."
    },
    "Primordial (Água) — perda, memória emocional e reconstrução do afeto."
  ),
  createCard(
    "6 de Primordial",
    {
      frase: "A memória regressa como um perfume antigo, trazendo inocência, raiz e doçura ao presente.",
      significado: "Nostalgia",
      influencia: "Recordação, tradição, infância, reencontro com origens, ternura."
    },
    {
      frase: "A lembrança se torna prisão, e o passado consome o presente em apego estagnado.",
      significado: "Estagnação",
      influencia: "Fuga para trás, imobilidade emocional, recusa do agora, excesso de saudade."
    },
    "Primordial (Água) — memória, herança afetiva e continuidade do sentir."
  ),
  createCard(
    "7 de Primordial",
    {
      frase: "Sete desejos brilham ao mesmo tempo, sedutores demais para que a vontade escolha um só.",
      significado: "Ilusões",
      influencia: "Fantasia, excesso de possibilidades, devaneio, tentação, dispersão emocional."
    },
    {
      frase: "A névoa se desfaz e resta a escolha possível, concreta e finalmente assumida.",
      significado: "Clareza",
      influencia: "Discernimento, foco, ação real, decisão consciente, quebra da fantasia."
    },
    "Primordial (Água) — desejo, imaginação e sedução das possibilidades."
  ),
  createCard(
    "8 de Primordial",
    {
      frase: "Mesmo com as taças cheias, a alma percebe o vazio e parte em busca de sentido mais profundo.",
      significado: "Partida em Busca de Sentido",
      influencia: "Abandono consciente, retiro, jornada interior, desapego, coragem de ir além."
    },
    {
      frase: "O movimento falha, e a busca se perde em círculos, medo e deriva sem direção.",
      significado: "Paralisia",
      influencia: "Retorno covarde, fuga sem propósito, estagnação, medo do desconhecido."
    },
    "Primordial (Água) — saciedade aparente, vazio interior e busca da verdade profunda."
  ),
  createCard(
    "9 de Primordial",
    {
      frase: "As taças transbordam ao redor de quem enfim pode saborear o fruto do próprio desejo.",
      significado: "Satisfação",
      influencia: "Prazer, contentamento, bem-estar, realização emocional, fartura interior."
    },
    {
      frase: "Nada basta, e o desejo realizado revela um vazio que exige sempre mais.",
      significado: "Insaciedade",
      influencia: "Ganância emocional, excesso, gula afetiva, descontentamento, carência mascarada."
    },
    "Primordial (Água) — prazer, plenitude e colheita emocional."
  ),
  createCard(
    "10 de Primordial",
    {
      frase: "Sob o arco de uma aliança viva, o amor se manifesta como harmonia compartilhada e duradoura.",
      significado: "Felicidade",
      influencia: "União familiar, plenitude, legado afetivo, casa harmoniosa, paz profunda."
    },
    {
      frase: "A imagem perfeita se parte, revelando fissuras de afeto, carência e desunião íntima.",
      significado: "Discórdia",
      influencia: "Conflito familiar, ruptura emocional, falsas aparências, desconexão afetiva."
    },
    "Primordial (Água) — família, pertencimento e culminação do afeto."
  ),
  createCard(
    "Pajem de Primordial",
    {
      frase: "O iniciado escuta presságios no fundo do cálice e desperta para o invisível com delicadeza.",
      significado: "Intuição",
      influencia: "Sensibilidade, sonhos, mensagem sutil, aprendizado emocional, abertura psíquica."
    },
    {
      frase: "A sensibilidade sem eixo degenera em engano, sedução torta e autoilusão.",
      significado: "Estagnação",
      influencia: "Manipulação emocional, imaturidade, intuição bloqueada, fantasia usada como máscara."
    },
    "Primordial (Água) — juventude emocional, pressentimento e escuta do invisível."
  ),
  createCard(
    "Cavaleiro de Primordial",
    {
      frase: "Ele navega pelo coração como quem segue uma estrela romântica sem desviar do ideal.",
      significado: "Paixão",
      influencia: "Devoção, romance, entrega, idealismo, busca por conexão verdadeira."
    },
    {
      frase: "A devoção vira ciúme, duplicidade e promessa afetiva que não se sustenta.",
      significado: "Ciúme",
      influencia: "Desilusão, oscilação emocional, fraude sentimental, amor não correspondido."
    },
    "Primordial (Água) — paixão, entrega e movimento guiado pelo coração."
  ),
  createCard(
    "Rainha de Primordial",
    {
      frase: "Ela governa as marés do sentir com empatia, profundidade e sabedoria psíquica.",
      significado: "Sabedoria",
      influencia: "Empatia, acolhimento, autoconhecimento, imaginação fértil, visão interior."
    },
    {
      frase: "As águas internas se revoltam, e a sensibilidade se converte em drama e manipulação.",
      significado: "Descontrole",
      influencia: "Caos emocional, insegurança, projeção, turbulência afetiva, dependência."
    },
    "Primordial (Água) — profundidade emocional, empatia e soberania do sentir."
  ),
  createCard(
    "Rei de Primordial",
    {
      frase: "Ele domina as marés sem negá-las, transformando emoção em conselho, equilíbrio e diplomacia.",
      significado: "Diplomacia",
      influencia: "Controle emocional, serenidade, liderança afetiva, responsabilidade, conselho sábio."
    },
    {
      frase: "Ao usar o coração alheio como instrumento, o governante cai na manipulação e no abuso.",
      significado: "Abuso de Poder",
      influencia: "Jogo duplo, frieza calculada, controle emocional tóxico, traição afetiva."
    },
    "Primordial (Água) — autoridade emocional, equilíbrio e poder do vínculo."
  ),

  // 51–64 Dinâmica (baseado no bloco de Dinamismo do PDF: 23–36)
  createCard(
    "Ás de Dinâmica",
    {
      frase: "Uma ideia corta a névoa com nitidez absoluta e inaugura um novo regime de pensamento.",
      significado: "Iluminação",
      influencia: "Insight, invenção, clareza mental, concepção brilhante, verdade intelectual."
    },
    {
      frase: "O intelecto se torna lâmina cruel, e a ideia serve à destruição em vez da verdade.",
      significado: "Destruição",
      influencia: "Confusão deliberada, tirania mental, perversão do raciocínio, uso violento da razão."
    },
    "Dinâmica (Ar) — mente ativa, mutabilidade, ação intelectual e ruptura."
  ),
  createCard(
    "2 de Dinâmica",
    {
      frase: "Duas forças se encaram em silêncio, e a mente fica suspensa entre rotas igualmente tensas.",
      significado: "Impasse",
      influencia: "Indecisão, análise excessiva, pausa, dúvida, trégua precária."
    },
    {
      frase: "A estagnação rompe-se de forma brusca, e a escolha surge em meio a caos e traição interior.",
      significado: "Traição",
      influencia: "Ruptura precipitada, revelação desconfortável, decisão mal calibrada, movimento desordenado."
    },
    "Dinâmica (Ar) — conflito mental, dualidade e necessidade de decisão."
  ),
  createCard(
    "3 de Dinâmica",
    {
      frase: "A verdade corta fundo, e a dor expõe uma ferida que não pode mais ser ignorada.",
      significado: "Coração Partido",
      influencia: "Traição, tristeza, separação, amargura, sofrimento lúcido."
    },
    {
      frase: "As lâminas começam a sair, e a dor, embora ainda real, já não governa sozinha.",
      significado: "Recuperação",
      influencia: "Cura, aceitação, perdão, cicatrização, reconquista gradual da paz."
    },
    "Dinâmica (Ar) — corte, lucidez dolorosa e confronto com a verdade."
  ),
  createCard(
    "4 de Dinâmica",
    {
      frase: "O mundo exige pausa, e o corpo ou a mente recolhem-se para sobreviver ao excesso.",
      significado: "Repouso",
      influencia: "Retiro, recuperação, convalescença, silêncio necessário, preservação."
    },
    {
      frase: "O descanso é interrompido antes da hora, e o retorno ao mundo vem com inquietação.",
      significado: "Interrupção",
      influencia: "Despertar prematuro, vulnerabilidade, agitação, fim brusco da pausa, instabilidade."
    },
    "Dinâmica (Ar) — suspensão, recuperação e reordenação da mente."
  ),
  createCard(
    "5 de Dinâmica",
    {
      frase: "Há vitória no campo, mas ela deixa na boca o gosto amargo da humilhação e do custo excessivo.",
      significado: "Derrota",
      influencia: "Vitória pírrica, sabotagem, desonra, conflito tóxico, triunfo sem valor."
    },
    {
      frase: "Depois da disputa, a consciência retorna e pede reparação, perdão e reconciliação.",
      significado: "Arrependimento",
      influencia: "Remorso, culpa, revisão ética, tentativa de paz, retorno da integridade."
    },
    "Dinâmica (Ar) — confronto, competição e preço da vitória."
  ),
  createCard(
    "6 de Dinâmica",
    {
      frase: "A travessia segue firme: sair da dor exige deslocamento, racionalidade e coragem de prosseguir.",
      significado: "Transição",
      influencia: "Mudança, passagem, reorganização, solução prática, travessia segura."
    },
    {
      frase: "A barca não avança, e a passagem pretendida se converte em bloqueio e deriva.",
      significado: "Estagnação",
      influencia: "Sem saída, atraso, impedimento, peso emocional, fracasso do deslocamento."
    },
    "Dinâmica (Ar) — deslocamento, solução racional e passagem entre estados."
  ),
  createCard(
    "7 de Dinâmica",
    {
      frase: "Tudo depende de precisão absoluta; basta um tremor e o espetáculo se torna tragédia.",
      significado: "Instabilidade",
      influencia: "Risco calculado, tensão, vulnerabilidade técnica, linha tênue entre sucesso e desastre."
    },
    {
      frase: "A experiência do risco se converte em conselho, e a antiga falha passa a orientar com sabedoria.",
      significado: "Conselho",
      influencia: "Mentoria, correção, prudência, transmissão de experiência, segurança aprendida."
    },
    "Dinâmica (Ar) — risco, precisão e domínio instável do movimento."
  ),
  createCard(
    "8 de Dinâmica",
    {
      frase: "A prisão está na mente: pensamentos se amarram uns aos outros até a ação parecer impossível.",
      significado: "Armadilha",
      influencia: "Paralisia, restrição, dúvida, censura interna, crise mental."
    },
    {
      frase: "As amarras cedem quando a percepção muda, e o cárcere se revela menos sólido do que parecia.",
      significado: "Libertação",
      influencia: "Alívio, nova perspectiva, emancipação mental, paz, retorno de movimento."
    },
    "Dinâmica (Ar) — bloqueio psíquico, restrição e necessidade de clareza."
  ),
  createCard(
    "9 de Dinâmica",
    {
      frase: "Na hora mais silenciosa, a mente faz de si mesma carrasco e transforma a noite em tormento.",
      significado: "Pesadelo",
      influencia: "Ansiedade, culpa, insônia, desespero, autossabotagem."
    },
    {
      frase: "Mesmo depois da pior noite, uma fresta de esperança surge e devolve fôlego ao espírito.",
      significado: "Esperança",
      influencia: "Alívio, enfrentamento do medo, recuperação frágil, possibilidade de renascer."
    },
    "Dinâmica (Ar) — angústia mental, tormento e confronto com o medo."
  ),
  createCard(
    "10 de Dinâmica",
    {
      frase: "O colapso é total; tudo chegou ao limite e agora só resta reconhecer o fundo do poço.",
      significado: "Ruína",
      influencia: "Fim brutal, traição, exaustão extrema, desolação, encerramento doloroso."
    },
    {
      frase: "Do fundo do abismo ainda é possível erguer-se, e a sobrevivência já é uma forma de vitória.",
      significado: "Sobrevivência",
      influencia: "Resiliência, nova chance, recomeço forçado, recuperação após ruína, aprendizado duro."
    },
    "Dinâmica (Ar) — fim extremo, ruptura total e sobrevivência da consciência."
  ),
  createCard(
    "Pajem de Dinâmica",
    {
      frase: "Ele observa, coleta sinais e transforma informação em ação rápida e incisiva.",
      significado: "Espionar",
      influencia: "Curiosidade, vigilância, inteligência prática, notícias, prontidão mental."
    },
    {
      frase: "Sem preparo, a vigilância vira paranóia e crueldade juvenil, produzindo erro atrás de erro.",
      significado: "Errar",
      influencia: "Impreparo, fofoca, traição tola, vigilância mal usada, incompetência."
    },
    "Dinâmica (Ar) — juventude intelectual, observação e agilidade de pensamento."
  ),
  createCard(
    "Cavaleiro de Dinâmica",
    {
      frase: "Ele age antes de duvidar, rompendo linhas com audácia, velocidade e sede de avanço.",
      significado: "Audácia",
      influencia: "Ação imediata, impulso, coragem, ofensiva, pensamento veloz."
    },
    {
      frase: "Sem direção, o ímpeto se torna violência vazia, bravata e ação destrutiva.",
      significado: "Violência",
      influencia: "Imprudência, brutalidade, fanfarronice, pressa sem estratégia, choque estéril."
    },
    "Dinâmica (Ar) — ímpeto, investida e agressividade do movimento."
  ),
  createCard(
    "Rainha de Dinâmica",
    {
      frase: "Sua mente lê o essencial sem piedade, cortando ilusões com discernimento implacável.",
      significado: "Crítica",
      influencia: "Perspicácia, objetividade, julgamento, lucidez, independência intelectual."
    },
    {
      frase: "A lucidez amarga-se e a inteligência passa a ferir, distorcer e corroer tudo ao redor.",
      significado: "Cinismo",
      influencia: "Malícia, frieza agressiva, intolerância, linguagem venenosa, dureza estéril."
    },
    "Dinâmica (Ar) — discernimento, corte e soberania da mente crítica."
  ),
  createCard(
    "Rei de Dinâmica",
    {
      frase: "Ele governa pelo logos: sua autoridade nasce de foco, estratégia e juízo sem hesitação.",
      significado: "Julgamento",
      influencia: "Razão, lei, conselho firme, decisão, comando intelectual."
    },
    {
      frase: "Quando a lei perde a justiça, a razão se torna arma fria nas mãos de um tirano.",
      significado: "Tirano",
      influencia: "Injustiça, abuso lógico, crueldade racional, opressão, estratégia perversa."
    },
    "Dinâmica (Ar) — autoridade mental, razão estruturada e veredito."
  ),

  // 65–78 Padrão (baseado no bloco de Padrão do PDF: 37–50)
  createCard(
    "Ás de Padrão",
    {
      frase: "O potencial toma forma concreta: capital, matéria e estrutura se oferecem como semente de prosperidade.",
      significado: "Prosperidade",
      influencia: "Novo empreendimento, base material, investimento, começo sólido, oportunidade tangível."
    },
    {
      frase: "A base já nasce corrompida, e o que poderia florescer se perde em ganância e mau uso.",
      significado: "Corrupção",
      influencia: "Desperdício, gestão falha, falso começo material, caos financeiro, oportunidade perdida."
    },
    "Padrão (Terra) — forma, estrutura, matéria e progresso concreto."
  ),
  createCard(
    "2 de Padrão",
    {
      frase: "O equilíbrio se sustenta pelo ajuste constante entre fluxos, pesos e exigências do mundo material.",
      significado: "Equilíbrio",
      influencia: "Adaptabilidade, gestão de recursos, comércio, flexibilidade, malabarismo eficaz."
    },
    {
      frase: "O jogo do equilíbrio falha, e o sistema oscila entre dívida, instabilidade e pânico.",
      significado: "Desequilíbrio",
      influencia: "Volatilidade, quebra, sobrecarga material, má gestão, instabilidade econômica."
    },
    "Padrão (Terra) — adaptação prática, gestão e harmonia de recursos."
  ),
  createCard(
    "3 de Padrão",
    {
      frase: "A grande obra avança porque habilidade, disciplina e esforço se unem numa mesma direção.",
      significado: "Esforço",
      influencia: "Construção, ofício, trabalho em equipe, excelência prática, progresso consistente."
    },
    {
      frase: "A estrutura falha por dentro, e o trabalho perde qualidade, coesão e propósito.",
      significado: "Mediocridade",
      influencia: "Negligência, incompetência, material ruim, desorganização, obra inferior."
    },
    "Padrão (Terra) — construção, trabalho e realização concreta."
  ),
  createCard(
    "4 de Padrão",
    {
      frase: "A riqueza se fecha em torno de si mesma, buscando segurança por posse, controle e contenção.",
      significado: "Herança",
      influencia: "Acumulação, estabilidade, conservação, proteção de recursos, solidez."
    },
    {
      frase: "O controle se rompe, e aquilo que era fortaleza vira perda, roubo e dissipação.",
      significado: "Perda",
      influencia: "Gastos imprudentes, vulnerabilidade, ruína material, descontrole patrimonial."
    },
    "Padrão (Terra) — estabilidade, posse e defesa da forma material."
  ),
  createCard(
    "5 de Padrão",
    {
      frase: "A exclusão material pesa como sentença, expondo abandono, privação e miséria sem disfarce.",
      significado: "Empobrecimento",
      influencia: "Carência, solidão, doença, pobreza, rejeição por um sistema impessoal."
    },
    {
      frase: "Mesmo na escassez, um gesto de auxílio abre passagem para dignidade e esperança.",
      significado: "Esperança na Adversidade",
      influencia: "Ajuda mútua, sobrevivência, recuperação, companheirismo, riqueza interior."
    },
    "Padrão (Terra) — privação, necessidade e confronto com a exclusão do mundo físico."
  ),
  createCard(
    "6 de Padrão",
    {
      frase: "A abundância se distribui, mas nunca sem revelar quem detém o poder de dar.",
      significado: "Patrocínio",
      influencia: "Ajuda concreta, filantropia, apoio material, patronagem, generosidade com hierarquia."
    },
    {
      frase: "A ajuda cobra seu preço, e o presente se revela dívida, controle e exploração mascarada.",
      significado: "Exploração",
      influencia: "Obrigação forçada, dependência, extorsão, paternalismo tóxico, ressentimento."
    },
    "Padrão (Terra) — circulação de recursos, poder material e obrigação."
  ),
  createCard(
    "7 de Padrão",
    {
      frase: "É hora de vigiar o que foi plantado, medir o retorno e refinar o próximo passo com paciência.",
      significado: "Reavaliação",
      influencia: "Espera estratégica, análise, amadurecimento, ajuste fino, proteção do investimento."
    },
    {
      frase: "É hora de vigiar o que foi plantado, medir o retorno e refinar o próximo passo com paciência.",
      significado: "Reavaliação",
      influencia: "Espera estratégica, análise, amadurecimento, ajuste fino, proteção do investimento."
    },
    "Padrão (Terra) — maturação, colheita futura e prudência material."
  ),
  createCard(
    "8 de Padrão",
    {
      frase: "A habilidade se aperfeiçoa na repetição disciplinada, até que o ofício se torne força estável.",
      significado: "Habilidade",
      influencia: "Especialização, eficiência, prática, artesanato, domínio técnico."
    },
    {
      frase: "A rotina vira servidão, e o trabalho já não constrói: apenas esgota e reduz.",
      significado: "Incapacidade",
      influencia: "Alienação, fadiga, monotonia, exploração, impossibilidade de crescer."
    },
    "Padrão (Terra) — trabalho, técnica e aprimoramento da forma."
  ),
  createCard(
    "9 de Padrão",
    {
      frase: "A prosperidade se consolida em autonomia, refinamento e domínio sereno do próprio território.",
      significado: "Ganho",
      influencia: "Independência, riqueza refinada, estabilidade, lucro, desfrute merecido."
    },
    {
      frase: "A propriedade se torna uma gaiola dourada, e a segurança revela seus medos e vazios.",
      significado: "Riqueza Ilusória",
      influencia: "Isolamento, aparência sem paz, medo de perda, solidão, fragilidade escondida."
    },
    "Padrão (Terra) — colheita, autonomia e refinamento material."
  ),
  createCard(
    "10 de Padrão",
    {
      frase: "A obra ultrapassa o indivíduo e se converte em legado, nome, casa e continuidade.",
      significado: "Estabilidade",
      influencia: "Dinastia, herança, abundância duradoura, consolidação, fortuna familiar."
    },
    {
      frase: "O legado racha por dentro, e a herança deixa de unir para alimentar conflito e decadência.",
      significado: "Decadência e Conflito",
      influencia: "Disputa familiar, dissipação, queda do nome, herança corroída, desordem interna."
    },
    "Padrão (Terra) — legado, permanência e solidez geracional."
  ),
  createCard(
    "Pajem de Padrão",
    {
      frase: "Ele aprende devagar e com firmeza, transformando esforço humilde em mérito real.",
      significado: "Perseverança",
      influencia: "Diligência, estudo, início prático, autodidatismo, construção paciente do futuro."
    },
    {
      frase: "O potencial se dispersa, e a vontade desiste de crescer antes mesmo de ser testada.",
      significado: "Indecisão",
      influencia: "Autossabotagem, desperdício, desânimo, fuga do esforço, interrupção do progresso."
    },
    "Padrão (Terra) — aprendizado material, diligência e construção paciente."
  ),
  createCard(
    "Cavaleiro de Padrão",
    {
      frase: "Ele avança sem brilho, mas com constância inflexível, sustentando o mundo pelo dever.",
      significado: "Confiabilidade",
      influencia: "Disciplina, rotina, método, pragmatismo, estabilidade aplicada."
    },
    {
      frase: "A rotina endurece e degenera em brutalidade mecânica, obediência cega e abuso.",
      significado: "Abuso de Poder e Estagnação",
      influencia: "Inércia, opressão, violência institucional, rigidez vazia, dever sem consciência."
    },
    "Padrão (Terra) — constância, método e execução material."
  ),
  createCard(
    "Rainha de Padrão",
    {
      frase: "Ela transforma talento em estrutura, beleza em legado e cuidado em cultura duradoura.",
      significado: "Criatividade Próspera",
      influencia: "Fertilidade prática, arte concreta, patrocínio, gestão criativa, abundância cultivada."
    },
    {
      frase: "O cuidado vira sufocamento, e a criação passa a servir às aparências em vez da vida.",
      significado: "Controle Excessivo",
      influencia: "Rigidez, dependência, estética vazia, criatividade aprisionada, negligência afetiva."
    },
    "Padrão (Terra) — fertilidade concreta, gestão, cuidado e criação tangível."
  ),
  createCard(
    "Rei de Padrão",
    {
      frase: "Ele reina sobre o mundo físico com visão empresarial, mão firme e domínio sobre a matéria.",
      significado: "Poder Material e Maestria",
      influencia: "Riqueza, controle, pragmatismo, construção, segurança financeira."
    },
    {
      frase: "Sem ética, a maestria se converte em exploração, ganância e império erguido sobre ruína alheia.",
      significado: "Exploração",
      influencia: "Corrupção, abuso econômico, vazio espiritual, tirania material, predatório."
    },
    "Padrão (Terra) — domínio material, estabilidade e poder estruturante."
  )
];

RAW_CARDS.forEach((def, index) => {
  const idBase = index + 1;

  tarotData.push({
    idBase,
    nome: def.nome,
    imagem: `images/Cartas-${idBase}.png`,
    texto: formatText(def.normal, def.essencia),
    textoInvertido: formatText(def.invertido, def.essencia),
    valorCompletoNormal: idBase,
    valorCompletoInvertido: idBase + 78
  });
});

function getCardByIdBase(idBase) {
  return tarotData.find((carta) => carta.idBase === idBase) || null;
}

window.tarotData = tarotData;
window.getCardByIdBase = getCardByIdBase;
