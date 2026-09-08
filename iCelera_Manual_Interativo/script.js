import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// ==========================================
// CONFIGURAÇÃO FIREBASE
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDgSx5qFz2S6gsj00T7meCrSYyIv54uCmE",
  authDomain: "iceleramanual.firebaseapp.com",
  projectId: "iceleramanual",
  storageBucket: "iceleramanual.firebasestorage.app",
  messagingSenderId: "939770142735",
  appId: "1:939770142735:web:88dd046c02dc70a029437a",
  measurementId: "G-KTD865N7DY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Inicializa o Storage

// ==========================================
// BASE DE DADOS LOCAL (SEÇÕES DO MANUAL)
// ==========================================
const sections = [
  {
    id: 1,
    title: "Comunicação, Rede e Conectividade IP",
    icon: "⌁",
    description: "Estabelecer, manter e diagnosticar a comunicação entre equipamentos iCelera e o computador.",
    keywords: ["ip", "rede", "ping", "wifi", "wi-fi", "ethernet", "chn", "vgpe", "adaptador", "conectividade"],
    highlights: ["IP estático por linha", "Teste de conectividade (Ping)", "Parâmetro CHN (K, W, C)", "Conflitos de rede", "Reboot duplo VGPE / VGPEE", "Adaptadores homologados"],
    media: [
      "adaptadorusbrede.mp4",
      "CHN.mp4",
      "Ping-BemSucedido.png",
      "Ping-Malsucedido.png"
    ],
    procedures: [
      { title: "1.1 — Configuração de IP Estático IPv4", intro: "Configuração da interface Ethernet para comunicação com o equipamento.", steps: [
        "Pressione Windows + R, digite ncpa.cpl e pressione Enter.",
        "Clique com o botão direito no adaptador conectado ao aparelho e abra Propriedades.",
        "Abra Protocolo IP Versão 4 (TCP/IPv4).",
        "Selecione Usar o seguinte endereço IP.",
        "NANO / iBLUE: IP 192.168.5.90 | Máscara 255.255.255.0 | Gateway 192.168.5.10.",
        "FASTPOLI: IP 192.168.1.90 | Máscara 255.255.255.0 | Gateway 192.168.1.95.",
        "ANTIGA: IP 192.168.0.90 | Máscara 255.255.255.0 | Gateway 192.168.0.168.",
        "Clique em OK."
      ]},
      { title: "1.2 — Teste de Ping", intro: "Valide o link de rede antes de iniciar o software.", steps: [
        "Pressione Windows + R, digite cmd e pressione Enter.",
        "Execute ping 192.168.5.10 ou o gateway correspondente.",
        "Resposta positiva indica comunicação. Resposta com tempo limite pode indicar cabo desconectado, adaptador sem alimentação, conflito de sub-rede ou equipamento travado."
      ]},
      { title: "1.3 — Parâmetro CHN e travamento em loop", intro: "Quando o arquivo config.ini estiver com diretiva divergente.", steps: [
        "Feche o software e confirme no Gerenciador de Tarefas que o processo encerrou.",
        "Acesse a pasta raiz da instalação.",
        "Abra config.ini no Bloco de Notas.",
        "Localize CHN= e alterne entre W, K ou C conforme o caso.",
        "Salve com Ctrl + S.",
        "Desligue o aparelho da tomada/fonte por 10 a 15 segundos, religue e abra o programa.",
        "Se travar em 50% durante a ficha do paciente, descarte a ficha corrompida e crie uma nova ficha teste."
      ]},
      { title: "1.4 — Conflito de faixa com roteador/Wi-Fi", intro: "Diagnóstico de conflito quando a clínica usa a faixa 192.168.5.x.", steps: [
        "Desconecte o Wi-Fi do computador e teste o ping.",
        "Se normalizar, o conflito com a rede da clínica está confirmado.",
        "Solicite ao TI a alteração da faixa do roteador.",
        "Como alternativa emergencial, use hotspot móvel 4G/5G."
      ]},
      { title: "1.5 — Hardware VGPE / VGPEE", intro: "Procedimento de reboot duplo quando o traçado permanece estático.", steps: [
        "Desligue o equipamento pelo botão físico por 5 segundos e ligue novamente.",
        "Repita o desligamento e religamento pela segunda vez com o software aberto.",
        "Na segunda energização o traçado deve desbloquear.",
        "Se continuar estático, verifique amplitude e filtro passa-baixa."
      ]},
      { title: "1.6 — Adaptadores USB-Rede", intro: "Preferência por adaptadores homologados HP, Dell ou Lenovo.", steps: [
        "Abra Gerenciador de Dispositivos.",
        "Expanda Adaptadores de rede e abra o adaptador USB.",
        "Acesse Gerenciamento de Energia.",
        "Desmarque O computador pode desligar o dispositivo para economizar energia e clique em OK."
      ]}
    ]
  },
  {
    id: 2,
    title: "Registro de DLLs, Componentes OCX e Ambiente Windows",
    icon: "⚙",
    description: "Procedimentos para registro de bibliotecas e configurações do Windows.",
    keywords: ["dll", "ocx", "cmd", "regsvr32", "dep", "windows", "erro 380", "regional"],
    highlights: ["Registro NANO", "Registro iBLUE", "Registro FASTPOLI", "DEP", "Configurações regionais"],
    media: [
      "380.mp4",
      "Como registrar dll 1.mp4",
      "Como registrar dll 2.txt",
      "DEP.mp4"
    ],
    procedures: [
      { title: "2.1 — Registro de componentes NANO", steps: [
        "Feche o iCelera Nano.",
        "Abra o CMD como Administrador.",
        "Execute cd 'C:\\Program Files (x86)\\iCelera\\Nano' ou o diretório equivalente.",
        "Execute: regsvr32 ClassesBDNano.DLL",
        "Execute: regsvr32 WA_FotoAudio.ocx",
        "Execute: regsvr32 WA_MapaAmplitudeNano.ocx",
        "Execute: regsvr32 WA_Paleta.ocx",
        "Execute: regsvr32 WA_T1s20canais.ocx",
        "Execute: regsvr32 WAGrafResumoNano.ocx",
        "Execute: regsvr32 iCelera_Oximetro.ocx"
      ]},
      { title: "2.2 — Registro de componentes iBLUE", steps: [
        "Abra o CMD como Administrador.",
        "Navegue até C:\\Program Files (x86)\\iCelera\\iBlue.",
        "Execute: regsvr32 ClassesBDiBlue.dll",
        "Execute: regsvr32 WA_FotoAudio.ocx",
        "Execute: regsvr32 WA_MapaAmplitudeiBlue.ocx",
        "Execute: regsvr32 WA_Paleta.ocx",
        "Execute: regsvr32 WA_T1s20canais.ocx",
        "Execute: regsvr32 WAGrafResumoiBlue.ocx"
      ]},
      { title: "2.3 — Registro de componentes FASTPOLI", steps: [
        "Abra o CMD como Administrador.",
        "Navegue até C:\\Program Files (x86)\\iCelera\\FastPoli.",
        "Execute: regsvr32 ClassesBD.dll",
        "Execute: regsvr32 WAGrafResumo.ocx",
        "Execute: regsvr32 WA_T1s20canais.ocx",
        "Execute: regsvr32 WA_Paleta.ocx",
        "Execute: regsvr32 WA_MapaAmplitude.ocx",
        "Execute: regsvr32 WA_FotoAudio.ocx"
      ]},
      { title: "2.4 — Prevenção de Execução de Dados (DEP)", steps: [
        "Pressione Windows + R, digite sysdm.cpl e pressione Enter.",
        "Vá em Avançado > Desempenho > Configurações.",
        "Abra Prevenção de Execução de Dados.",
        "Configure a política conforme o procedimento do manual.",
        "Se houver exceção, adicione o executável .exe da iCelera.",
        "Aplique, confirme e reinicie o computador."
      ]},
      { title: "2.5 — Erro 380 / Formato decimal", steps: [
        "Pressione Windows + R e execute intl.cpl.",
        "Abra Configurações adicionais.",
        "Símbolo decimal: vírgula (,).",
        "Número de casas decimais: 2.",
        "Agrupamento de dígitos: ponto (.).",
        "Aplique e reinicie o programa."
      ]}
    ]
  },
  {
    id: 3,
    title: "Cartão SD, Gravação Domiciliar e Recuperação de Exames",
    icon: "▣",
    description: "Manipulação de cartões SD, recuperação de exames e programação domiciliar.",
    keywords: ["sd", "cartão", "cartao", "bkpd", "bkpm", "dat", "mdb", "fat32", "arquivo0", "exame domiciliar", "lock"],
    highlights: ["Recuperação .bkpd / .bkpm", "Reparo do arquivo0", "Formatação FAT32", "Cartões homologados", "Reprogramação", "Trava física"],
    media: [
      "como_mudar_o_bkpd_bkpd.mp4",
      "formatar_cartao.mp4",
      "TRAVALOCK.mp4"
    ],
    procedures: [
      { title: "3.1 — Recuperação de exames corrompidos", steps: [
        "Feche o software iCelera.",
        "Acesse a pasta Exames.",
        "Localize os arquivos .bkpd e .bkpm.",
        "Copie ambos para a Área de Trabalho.",
        "Renomeie .bkpd para .DAT e .bkpm para .MDB.",
        "Mova os arquivos renomeados de volta para a pasta Exames.",
        "Abra o programa, selecione o exame e faça a análise."
      ]},
      { title: "3.2 — Reparo do arquivo0", steps: [
        "Se arquivo0 estiver com 0 KB, copie um arquivo funcional de outro exame ou da pasta Suporte.",
        "Abra no Bloco de Notas e ajuste o código cadastral para o número correto do paciente.",
        "Salve na pasta do exame no cartão SD.",
        "Se estiver como ARQUIVO75, altere a sequência para ARQUIVO76 acompanhando o próximo sequencial.",
        "Baixe o exame novamente."
      ]},
      { title: "3.3 — Formatação completa FAT32", steps: [
        "Conecte o cartão SD ao computador.",
        "Clique com o botão direito na unidade e escolha Formatar.",
        "Selecione FAT32 (Padrão).",
        "Desmarque Formatação Rápida.",
        "Inicie e aguarde a formatação.",
        "Na raiz do cartão, crie um Documento de Texto (.txt) vazio e deixe-o presente."
      ]},
      { title: "3.4 — Cartões originais iCelera / SanDisk", steps: [
        "Cartões originais descritos no manual possuem a letra i de SanDisk pintada de preto com caneta permanente.",
        "Especificação homologada: SanDisk Classe 10 de 16 GB ou 32 GB.",
        "Não utilizar cartões de 64 GB ou 128 GB.",
        "Em erro repetitivo de gravação, realizar teste de integridade com H2testw."
      ]},
      { title: "3.5 — Exame domiciliar travado", steps: [
        "Desligue o aparelho e retire o cartão SD.",
        "Ligue o aparelho sem o cartão e aguarde 30 segundos.",
        "Abra a aquisição no PC para limpar a memória volátil.",
        "Desligue, recoloque o cartão formatado com o .txt vazio.",
        "Ligue e cadastre nova programação."
      ]},
      { title: "3.6 — Trava física LOCK", steps: [
        "Retire o adaptador SD.",
        "Mova a chave lateral para a posição superior, longe de LOCK.",
        "Se a trava estiver frouxa, substitua o adaptador."
      ]}
    ]
  },
  {
    id: 4,
    title: "Laudos, Hipnograma e Análise Automática",
    icon: "▥",
    description: "Correção de inconformidades em laudos, hipnogramas e análise automática.",
    keywords: ["laudo", "hipnograma", "gpv", "boa noite", "bom dia", "access", "tbl_dadosexame", "respiratório"],
    highlights: ["Arquivo .GPV", "Boa Noite / Bom Dia", "tbl_DadosExame", "Tipo 3", "Microsoft Word"],
    media: [
      "alterartipoexame.mp4",
      "bomdiaenoite.mp4",
      "gpverecalcular.mp4"
    ],
    procedures: [
      { title: "4.1 — Eliminar .GPV e recalcular análise", steps: [
        "Feche o exame.",
        "Acesse a pasta Exames.",
        "Localize e delete o arquivo [NumeroDoExame].GPV.",
        "Abra o exame novamente.",
        "Na Análise Automática, marque a opção para calcular/somar Dessaturação.",
        "Processe a análise e gere o laudo novamente."
      ]},
      { title: "4.2 — Marcadores Boa Noite e Bom Dia", steps: [
        "Abra o traçado.",
        "Posicione a barra no início efetivo do sono e insira Boa Noite.",
        "Avance até o despertar e insira Bom Dia.",
        "Se estiverem sobrepostos, no mesmo segundo ou invertidos, exclua ambos e reposicione."
      ]},
      { title: "4.3 — tbl_DadosExame", steps: [
        "Abra [Exame].MDB no Microsoft Access.",
        "Abra tbl_DadosExame ou dadosexames em Modo Design.",
        "Abra simultaneamente um MDB íntegro.",
        "Copie colunas e valores de calibração de Supino, Prono, Lateral D e Lateral E.",
        "Salve e reabra o exame."
      ]},
      { title: "4.4 — Laudo somente respiratório (Tipo 3)", steps: [
        "Selecione o exame.",
        "Clique em Alterar Tipo de Exame e defina Respiratório.",
        "Abra o exame e selecione Montagem Respiratória.",
        "Vá em Ferramentas > Atribuir um único estágio.",
        "Gere o laudo focado nos canais cardiorrespiratórios."
      ]},
      { title: "4.5 — Word / permissões", steps: [
        "Finalize WINWORD.EXE, EXCEL.EXE ou iCelera.exe presos no Gerenciador de Tarefas.",
        "Defina o Microsoft Word como padrão para .doc, .docx e .rtf.",
        "Garanta permissão completa de gravação na pasta Laudos."
      ]}
    ]
  },
  {
    id: 5,
    title: "Catálogo de Erros Numéricos e Mensagens do Sistema",
    icon: "!",
    description: "Guia de resolução rápida para os códigos de erro mais frequentes.",
    keywords: ["erro 11", "erro 6", "erro 9", "erro 76", "erro 380", "erro 94", "erro 64", "e_fail", "overflow", "division by zero"],
    highlights: ["Erro 11", "Erro 6", "Erro 9", "Erro 76", "Erro 380", "Erros 94 e 64", "E_FAIL"],
    media: [],
    procedures: [
      { title: "5.1 — Erro 11: Division by zero", intro: "Causa indicada no manual: taxa de amostragem zerada no MDB ou canal duplicado.", steps: [
        "Abra [Exame].MDB no Access e a tabela tbl_Canais_Adquiridos.",
        "Preencha Quantidade de Amostra / Taxa de Amostragem com 512.",
        "No iCelera, vá em Montagens > Poli Padrão.",
        "Exclua o canal E1 se estiver duplicado.",
        "Salve e abra o exame."
      ]},
      { title: "5.2 — Erro 6: Over Flow", steps: [
        "Delete o .GPV do exame.",
        "Ajuste a escala do Windows para 100%.",
        "Limite Boa Noite e Bom Dia ao período estrito de sono, máximo de 8 a 9 horas.",
        "Processe a análise automática e gere o laudo."
      ]},
      { title: "5.3 — Erro 9: Subscript out of range", steps: [
        "Abra o MDB com erro e a tabela tbl_Canais_Adquiridos.",
        "Abra um MDB funcional recente.",
        "Copie as linhas da tabela do exame bom para o exame com erro.",
        "Salve e reimporte."
      ]},
      { title: "5.4 — Erro 76: Caminho não encontrado", steps: [
        "Abra Configurações > Diretórios.",
        "No campo WinRAR, aponte para C:\\Program Files\\WinRAR\\WinRAR.exe.",
        "Remova barras extras ao final.",
        "Finalize WinRAR.exe preso no Gerenciador de Tarefas.",
        "Verifique se Google Drive/Dropbox está ativo e sincronizado."
      ]},
      { title: "5.5 — Erro 380", steps: [
        "Abra intl.cpl.",
        "Configure símbolo decimal como vírgula e agrupamento como ponto.",
        "Salve e reabra o software."
      ]},
      { title: "5.6 — Erros 94 e 64 ao PDF", steps: [
        "Abra o exame e os Dados do Paciente.",
        "Clique em Alterar.",
        "Preencha Data de Nascimento no formato DD/MM/AAAA.",
        "Grave as alterações e gere o PDF."
      ]},
      { title: "5.7 — E_FAIL / Provedor de Dados", steps: [
        "Renomeie pacientes.mdb para pacientes.old.",
        "Copie um pacientes.mdb virgem da pasta de suporte/instalador para a raiz.",
        "Cadastre o paciente usando apenas números nos campos de peso e altura."
      ]}
    ]
  },
  {
    id: 6,
    title: "Integração de Periféricos",
    icon: "⌁",
    description: "Câmera, oxímetro, FastPoli, CPAP e módulos de comunicação.",
    keywords: ["camera", "vídeo", "vpsg", "codec", "fastpoli", "fastmap", "cpap", "oxímetro", "com", "resmed"],
    highlights: ["VPSG / TEMVIDEO", "Captura 720p 30fps", "Portas COM", "CPAP", "Oxímetro"],
    media: [],
    procedures: [
      { title: "6.1 — Vídeo VPSG", steps: [
        "Abra config.ini na pasta raiz.",
        "Adicione ou edite TEMVIDEO=SIM.",
        "Instale o StarCodec no modo Full.",
        "Se necessário, instale o utilitário AMCAP para captura direta."
      ]},
      { title: "6.2 — Tela preta/azul", steps: [
        "Conecte a placa de captura USB em uma porta USB 3.0 nativa.",
        "Abra Configurações > Vídeo.",
        "Dispositivo de captura: DVR ou índice correspondente.",
        "Resolução: 720p (1280x720) a 30 fps.",
        "Video Codec: Fast-Motion.",
        "No traçado, marque Mesma altura para todos os canais."
      ]},
      { title: "6.3 — Portas COM / FastMap", steps: [
        "Abra o Gerenciador de Dispositivos e identifique a porta COM.",
        "No FastPoli, vá em Cadastro > Equipamentos Seriais e selecione a porta correspondente.",
        "No FastMap, vá em Configuração > Tipo de Comunicação com o Hardware.",
        "Marque USB e selecione a porta COM."
      ]},
      { title: "6.4 — CPAP", steps: [
        "Philips Respironics: módulo analógico + módulo Link + cabo serial dedicado.",
        "ResMed S8: ResControl II + ResScan + cabo Null Modem Serial.",
        "ResMed S9: TxLink + adaptador USB + cabo USB.",
        "Fisher & Paykel: módulo Analógico LabPort.",
        "Utilize o par de adaptadores e módulo Link fornecido exclusivamente pela iCelera.",
        "Configure Filtro Passa-Baixa em 2 Hz no canal Pressão CPAP."
      ]},
      { title: "6.5 — Oxímetro", steps: [
        "Funcionamento normal: LED vermelho fixo.",
        "Sensor piscando pode indicar mau contato ou baixa perfusão.",
        "Teste com Powerbank iCelera 100% carregado.",
        "Se normalizar, a fonte de tomada pode estar gerando ruído.",
        "Insira o dedo até o final da bolsa de silicone e fixe o cabo com micropore."
      ]}
    ]
  },
  {
    id: 7,
    title: "Protocolos de Validação de Traçado, Eletrodos e Touca",
    icon: "⌁",
    description: "Metodologias de bancada para isolamento de ruídos e validação de eletrodos.",
    keywords: ["eletrodo", "touca", "pasta", "água com sal", "ruído", "a1", "a2", "testa", "ref", "bateria"],
    highlights: ["Teste da pasta", "Teste da água com sal", "A1 / A2 / TESTA / REF", "Fonte do notebook", "Higienização"],
    media: [
      "Como criar montagem.mp4",
      "LIMPANDO O ELETRODO TOUCA.mp4",
      "LIMPANDO O ELETRODO.mp4",
      "teste em pasta video.mp4",
      "teste em pasta.jpeg"
    ],
    procedures: [
      { title: "7.1 — Teste da Pasta", steps: [
        "Conecte todos os eletrodos ao aparelho.",
        "Utilize um pote de pasta condutora com no mínimo 500 g.",
        "Mergulhe todas as cúpulas na pasta, separadas entre si.",
        "Inicie o traçado.",
        "Eletrodos íntegros: traçado reto, liso e linear.",
        "Canal oscilando ou ruidoso pode indicar eletrodo oxidado ou rompido."
      ]},
      { title: "7.2 — Teste da Água com Sal", steps: [
        "Dissolva 2 colheres de sopa de sal em um recipiente grande com água.",
        "Submerja as cúpulas sem encostar umas nas outras.",
        "Inicie o traçado no Nano EEG.",
        "Canais devem permanecer planos e estáveis; oscilações podem indicar cúpula gasta ou fio rompido."
      ]},
      { title: "7.3 — Quatro eletrodos referenciais", steps: [
        "Quando múltiplos canais apresentarem ruído simultaneamente, substitua os quatro eletrodos mestres.",
        "T: Testa / Aterramento.",
        "R: Referência diferencial.",
        "A1: Auricular esquerdo.",
        "A2: Auricular direito.",
        "Faça assepsia com álcool 70% e fricção com gaze seca antes de reaplicar pasta ou gel."
      ]},
      { title: "7.4 — Isolamento de ruído da fonte", steps: [
        "Desconecte o carregador do notebook e opere somente na bateria.",
        "Se o traçado limpar imediatamente, o ruído pode vir da fonte paralela ou de tomada sem aterramento.",
        "Utilize carregador original ou Kit Powerbank."
      ]},
      { title: "7.5 — Higienização e vida útil", steps: [
        "Lave somente em água corrente fria com escovinha macia.",
        "Seque com papel toalha e guarde em local arejado.",
        "Não use água quente, não deixe de molho e não use sabão, álcool ou detergente nas cúpulas.",
        "Nunca torça os cabos.",
        "Vida útil indicada no manual: 5 a 6 meses de uso contínuo."
      ]},
      { title: "7.6 — Montagem personalizada com canal reserva", steps: [
        "Vá em Montagem > Duplicar / Criar Nova montagem.",
        "Redirecione o canal danificado para uma entrada reserva livre.",
        "Conecte o eletrodo à entrada reserva.",
        "Replique a mesma montagem no computador de laudos."
      ]}
    ]
  },
  {
    id: 8,
    title: "Instalação Limpa, Nuvem e Gestão de Arquivos",
    icon: "▤",
    description: "Resgate de arquivos, reinstalação, nuvem, backup e licenciamento.",
    keywords: ["virtualstore", "reinstalação", "nano.new", "nano.old", "google drive", "dropbox", "backup", "licença", "fabrica"],
    highlights: ["VirtualStore", "Instalação limpa", "Google Drive / Dropbox", "Backup", "Licença"],
    media: [],
    procedures: [
      { title: "8.1 — Resgate no VirtualStore", steps: [
        "Feche o iCelera.",
        "Pressione Windows + R e execute %localappdata%\\VirtualStore.",
        "Recorte a pasta iCelera encontrada e cole na Área de Trabalho.",
        "Em C:\\Program Files (x86)\\iCelera, abra Propriedades > Segurança > Editar.",
        "Marque Controle Total para Usuários e aplique.",
        "Mova Exames, Exame.mdb e Pacientes.mdb para a pasta do Nano."
      ]},
      { title: "8.2 — Reinstalação limpa", steps: [
        "Renomeie C:\\iCelera\\Nano para Nano.old.",
        "Crie Nano.New.",
        "Instale o programa apontando para Nano.New.",
        "Copie Exames, Laudos e Pacientes.mdb de Nano.old para Nano.New.",
        "Registre as DLLs como Administrador.",
        "Abra o programa e ajuste Próximo Código do Paciente.",
        "Renomeie Nano.New para Nano e recrie o atalho."
      ]},
      { title: "8.3 — Sincronização com nuvem", steps: [
        "Confirme que Google Drive ou Dropbox está ativo.",
        "No iCelera, abra Configurações > Diretórios.",
        "Configure o caminho do WinRAR sem barras extras no final.",
        "Aponte o envio de exames para a pasta da nuvem.",
        "Salve e use Transferência de Exame > Enviar Exame para Análise."
      ]},
      { title: "8.4 — Backup e armazenamento", steps: [
        "Mantenha no mínimo 30 a 50 GB livres na unidade C:.",
        "Faça backup mensal de exames já laudados para HD externo ou D:.",
        "Ao excluir exames antigos, esvazie a Lixeira do Windows e a lixeira web da nuvem."
      ]},
      { title: "8.5 — Licença", steps: [
        "Use o atalho emergencial indicado no manual quando aplicável.",
        "Como método FABRICA=1, adicione temporariamente a linha ao config.ini.",
        "Abra o software e informe o Número de Série solicitado.",
        "Feche, remova FABRICA=1, salve e reabra.",
        "Encaminhe Número de Série e nome da clínica à coordenação para registro."
      ]}
    ]
  },
  {
    id: 9,
    title: "Instalações e Configuração Padrão de Novos Ambientes",
    icon: "⌂",
    description: "Implantação de novos clientes, parametrização e checklist pré-treinamento.",
    keywords: ["instalação", "novo cliente", "hardware", "nano", "iblue", "apneiacare", "pdf creator", "paciente", "quarto", "treinamento"],
    highlights: ["Requisitos de hardware", "Instalação inicial", "Dados da clínica", "Faixas de pacientes", "Nano1 / Nano2", "Run-in", "Checklist"],
    media: [
      "Atualizar Iblue.mp4",
      "Atualização do Nano.mp4",
      "Instalação do nano funconario.mp4",
      "Instalação Fastpoli.mp4",
      "Instalação Neurofeedback.mp4",
      "Instalação PDF24.mp4"
    ],
    procedures: [
      { title: "9.1 — Requisitos mínimos e recomendados", steps: [
        "Mínimo: Core i3 7ª geração ou superior, 4 GB RAM, SSD 500 GB, 2 portas RJ45 em Desktop ou RJ45 + Wi-Fi em Notebook.",
        "Recomendado: Core i5 7ª geração ou superior, 8 GB RAM, SSD 1 TB.",
        "Sistema operacional: Windows 10 ou Windows 11, 64 bits.",
        "Usar leitor SD/USB SanDisk original e adaptadores de rede homologados HP, Dell ou Lenovo."
      ]},
      { title: "9.2 — Instalação e parametrização", steps: [
        "Conecte o equipamento à fonte oficial e ao Ethernet RJ45.",
        "Configure IP 192.168.5.90 / 255.255.255.0 / 192.168.5.10 e valide o ping.",
        "Instale o iCelera no diretório padrão.",
        "Instale PDF24 ou PDF Creator.",
        "No software, configure o PDF Creator / PDF24 como impressora padrão."
      ]},
      { title: "9.3 — Dados da clínica e código EXAME", steps: [
        "Acesse Configurações > Dados da Clínica.",
        "Insira Razão Social ou Nome Fantasia.",
        "Código Identificador: EXAME para novos cadastros ou ID fornecido pela central.",
        "Clique em Gravar."
      ]},
      { title: "9.4 — Faixas numéricas", steps: [
        "Quarto 1: iniciar em 10000.",
        "Quarto 2: iniciar em 20000.",
        "Quarto 3: iniciar em 30000.",
        "Quarto 4: iniciar em 40000.",
        "Quarto 5: iniciar em 50000.",
        "Quarto 6: iniciar em 60000."
      ]},
      { title: "9.5 — Múltiplos equipamentos", steps: [
        "Crie pastas isoladas como C:\\iCelera\\Nano1 e C:\\iCelera\\Nano2.",
        "Instale o executável correspondente em cada pasta.",
        "Registre DLLs em cada diretório.",
        "Crie atalhos claros, como iCelera Nano - Quarto 01."
      ]},
      { title: "9.6 — Run-in de 30 segundos", steps: [
        "Clique em Gravar Exame.",
        "Cadastre ficha com nome TESTE e preencha Data de Nascimento.",
        "Clique no botão vermelho Gravar.",
        "Deixe o traçado rodar por 30 segundos.",
        "Verifique comunicação, encerre o exame e gere a página em PDF."
      ]},
      { title: "9.7 — Checklist pré-treinamento", steps: [
        "AnyDesk instalado e com ID funcional.",
        "iCelera Nano / ApneiaCare, leitor PDF e WinRAR instalados e testados.",
        "Pessoa disponível para atuar como modelo durante a fixação de eletrodos.",
        "Fita métrica 10-20, lápis dermográfico, micropore, gaze, álcool 70%, pasta condutora ou gel e touca no tamanho correto.",
        "Cabelo 100% limpo e seco, sem gel, pomadas, cremes ou condicionadores."
      ]}
    ]
  }
];

// ==========================================
// ELEMENTOS GLOBAIS E EVENTOS SEGUROS
// ==========================================
const sideNav = document.getElementById("sideNav");
const sectionGrid = document.getElementById("sectionGrid");
const detailSection = document.getElementById("detailSection");
const detailContent = document.getElementById("detailContent");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const menuBtn = document.getElementById("menuBtn");
const menuCloseBtn = document.getElementById("menuClose");
const sidebarEl = document.getElementById("sidebar");
const overlayEl = document.getElementById("overlay");

function toggleMenu() {
  sidebarEl?.classList.toggle("open");
  overlayEl?.classList.toggle("show");
}

menuBtn?.addEventListener("click", toggleMenu);
menuCloseBtn?.addEventListener("click", toggleMenu);
overlayEl?.addEventListener("click", toggleMenu);

function renderSideNav() {
  if (!sideNav) return;
  sideNav.innerHTML = '';
  sections.forEach(s => {
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.style.marginBottom = '8px';

    const btn = document.createElement('button');
    btn.className = 'side-link';
    btn.style.justifyContent = 'space-between';
    btn.style.cursor = 'pointer';
    btn.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="side-number">${s.id}</span>
        <span>${s.title}</span>
      </div>
      <span class="arrow" style="transition: transform 0.2s; font-size: 10px;">▼</span>
    `;

    const content = document.createElement('div');
    content.className = 'dropdown-content';
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.3s ease';
    content.style.padding = '0 10px';

    s.procedures.forEach(p => {
      const itemBtn = document.createElement('button');
      itemBtn.textContent = p.title;
      itemBtn.style.display = 'block';
      itemBtn.style.width = '100%';
      itemBtn.style.textAlign = 'left';
      itemBtn.style.background = 'none';
      itemBtn.style.border = 'none';
      itemBtn.style.padding = '10px';
      itemBtn.style.fontSize = '12px';
      itemBtn.style.color = 'var(--text)';
      itemBtn.style.cursor = 'pointer';
      itemBtn.style.borderRadius = '8px';
      itemBtn.style.marginTop = '4px';
      
      itemBtn.onmouseover = () => itemBtn.style.backgroundColor = 'var(--bg)';
      itemBtn.onmouseout = () => itemBtn.style.backgroundColor = 'transparent';

      itemBtn.addEventListener('click', () => {
        openSection(s.id);
        setTimeout(() => {
          const headers = document.querySelectorAll('.procedure h3');
          for (let header of headers) {
            if (header.textContent === p.title) {
              header.scrollIntoView({ behavior: 'smooth', block: 'center' });
              break;
            }
          }
        }, 100);
        toggleMenu(); 
      });
      content.appendChild(itemBtn);
    });

    btn.addEventListener('click', () => {
      const isOpen = dropdown.classList.toggle('open');
      const arrow = btn.querySelector('.arrow');
      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        arrow.style.transform = 'rotate(180deg)';
        btn.style.color = 'var(--primary-dark)';
      } else {
        content.style.maxHeight = '0';
        arrow.style.transform = 'rotate(0deg)';
        btn.style.color = 'var(--text)';
      }
    });

    dropdown.appendChild(btn);
    dropdown.appendChild(content);
    sideNav.appendChild(dropdown);
  });
}

function cardTemplate(s) {
  return `
    <article class="section-card">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <span class="section-number" style="width: 45px; height: 45px; background: var(--bg); color: var(--blue); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">${s.id}</span>
        <span class="card-icon" style="color: var(--orange); font-size: 28px;">${s.icon}</span>
      </div>
      <h3 style="font-size: 18px; color: var(--primary-dark); margin-bottom: 10px;">${s.title}</h3>
      <p style="color: var(--muted); font-size: 13px; margin-bottom: 25px; line-height: 1.5; flex-grow: 1;">${s.description}</p>
      <button class="access-btn" data-id="${s.id}" style="width: 100%; background: var(--bg); color: var(--blue); border: none; border-radius: 12px; padding: 12px; font-weight: bold; font-size: 13px; cursor: pointer; transition: all 0.2s;">Acessar Seção →</button>
    </article>
  `;
}

function renderCards(list = sections) {
  if (!sectionGrid) return;
  sectionGrid.innerHTML = list.length
    ? list.map(cardTemplate).join("")
    : `<div class="section-card" style="grid-column: 1 / -1; align-items: center; justify-content: center; min-height: 200px;">
         <h3>Nenhum resultado encontrado</h3>
         <p>Tente pesquisar por outro erro, equipamento ou palavra-chave.</p>
       </div>`;

  if (resultCount) {
    resultCount.textContent = `${list.length} ${list.length === 1 ? "seção" : "seções"}`;
  }

  document.querySelectorAll(".access-btn").forEach(btn => {
    btn.addEventListener("click", () => openSection(Number(btn.dataset.id)));
  });
}

function openSection(id) {
  const s = sections.find(item => item.id === id);
  if (!s || !detailContent || !detailSection) return;

  document.querySelector(".navigation-section")?.classList.add("hidden");
  document.querySelector(".quick-panel")?.classList.add("hidden");
  document.querySelector(".hero")?.classList.add("hidden");
  detailSection.classList.remove("hidden");

  detailContent.innerHTML = `
    <div class="detail-header" style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
      <div>
        <span class="section-number" style="width:45px; height:45px; border-radius:14px; font-size:20px; font-weight:800; background:var(--blue); color:white; display:flex; align-items:center; justify-content:center; margin-bottom:15px;">${s.id}</span>
        <h2>${s.title}</h2>
        <p>${s.description}</p>
      </div>
      <button class="primary-btn" style="width: auto; padding: 14px 24px; display: flex; align-items: center; gap: 8px;" onclick="window.requestGalleryAccess(${s.id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        Abrir Galeria
      </button>
    </div>
    ${s.procedures.map(p => `
      <article class="procedure">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px; margin-bottom: 15px;">
          <h3 style="margin-bottom: 0; line-height: 1.2;">${p.title}</h3>
          <button class="media-btn" title="Ver galeria" onclick="window.requestGalleryAccess(${s.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </button>
        </div>
        ${p.intro ? `<p class="procedure-subtitle">${p.intro}</p>` : ""}
        <ol class="step-list">
          ${p.steps.map(step => `<li>${step}</li>`).join("")}
        </ol>
      </article>
    `).join("")}
  `;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeSection() {
  detailSection?.classList.add("hidden");
  document.querySelector(".navigation-section")?.classList.remove("hidden");
  document.querySelector(".quick-panel")?.classList.remove("hidden");
  document.querySelector(".hero")?.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("backBtn")?.addEventListener("click", closeSection);

searchInput?.addEventListener("input", e => {
  const query = e.target.value.trim().toLowerCase();
  if (!query) {
    renderCards(); 
    return;
  }
  const filtered = sections.filter(s => {
    const haystack = [
      s.title,
      s.description,
      ...s.keywords,
      ...s.procedures.map(p => `${p.title} ${p.intro || ""} ${p.steps.join(" ")}`)
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
  renderCards(filtered);
});

document.getElementById("themeBtn")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("icelera-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

document.getElementById("fontBtn")?.addEventListener("click", () => {
  const current = Number(document.documentElement.dataset.fontScale || 1);
  const next = current >= 1.2 ? 1 : current + 0.1;
  document.documentElement.dataset.fontScale = next;
  document.body.style.fontSize = `${next}em`;
});

if (localStorage.getItem("icelera-theme") === "dark") {
  document.body.classList.add("dark");
}

renderSideNav();
renderCards();

// ==========================================
// AUTENTICAÇÃO
// ==========================================
const roleEmails = {
  tecnico: "suporte.icelera3@icelera.com.br",
  coordenador: "coordenador.suporte@icelera.com.br"
};

let currentUserRole = null;
let currentLoginTab = 'tecnico';
let currentSectionForGallery = null;

const loginModal = document.getElementById('loginModal');
const galleryModal = document.getElementById('galleryModal');
const logoutBtn = document.getElementById('logoutBtn');
const submitLoginBtn = document.getElementById('submitLoginBtn');
const loginError = document.getElementById('loginError');

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentLoginTab = e.target.dataset.role;
  });
});

async function authenticate() {
  const pwd = document.getElementById('loginPassword')?.value;
  const email = roleEmails[currentLoginTab];

  if (!pwd) {
    showError("Digite a senha para continuar.");
    return;
  }

  if (submitLoginBtn) {
      submitLoginBtn.textContent = "Autenticando...";
      submitLoginBtn.disabled = true;
  }

  try {
    await signInWithEmailAndPassword(auth, email, pwd);
  } catch (error) {
    console.error("Erro no login:", error.code);
    showError("Credenciais inválidas. Tente novamente.");
    if (submitLoginBtn) {
        submitLoginBtn.textContent = "Entrar";
        submitLoginBtn.disabled = false;
    }
  }
}

function showError(msg) {
  if (loginError) {
      loginError.textContent = msg;
      loginError.classList.remove('hidden');
  }
}

submitLoginBtn?.addEventListener('click', authenticate);
document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') authenticate();
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserRole = user.email.includes("coordenador") ? "coordenador" : "tecnico";
    document.body.classList.remove('locked');
    
    if (loginModal) {
        loginModal.classList.remove('active');
        loginModal.style.pointerEvents = 'none'; 
    }
    
    logoutBtn?.classList.remove('hidden');
    
    if (submitLoginBtn) {
        submitLoginBtn.textContent = "Entrar";
        submitLoginBtn.disabled = false;
    }
    if (document.getElementById('loginPassword')) {
        document.getElementById('loginPassword').value = '';
    }
    loginError?.classList.add('hidden');

  } else {
    currentUserRole = null;
    document.body.classList.add('locked');
    
    if (loginModal) {
        loginModal.classList.add('active');
        loginModal.style.pointerEvents = 'auto'; 
    }
    
    logoutBtn?.classList.add('hidden');
    
    if (galleryModal?.classList.contains('active')) {
        galleryModal.classList.remove('active');
        galleryModal.style.pointerEvents = 'none';
    }
  }
});

logoutBtn?.addEventListener('click', async () => {
  try {
      await signOut(auth);
      window.location.reload(); 
  } catch(err) {
      console.error("Erro ao sair:", err);
  }
});

// ==========================================
// UPLOAD E DOWNLOAD REAL (FIREBASE STORAGE)
// ==========================================
window.requestGalleryAccess = function(sectionId) {
  currentSectionForGallery = sectionId;
  openGallery(sectionId);
};

document.getElementById('closeGalleryBtn')?.addEventListener('click', () => {
  if (galleryModal) {
      galleryModal.classList.remove('active');
      galleryModal.style.pointerEvents = 'none';
  }
});

// Busca os arquivos locais e os que estão na nuvem
async function openGallery(sectionId) {
  const section = sections.find(s => s.id === sectionId);
  if (!section) return;

  const galleryTitle = document.getElementById('galleryTitle');
  if (galleryTitle) galleryTitle.textContent = `Galeria: ${section.title}`;
  
  const grid = document.getElementById('galleryGrid');
  const tools = document.getElementById('coordinatorTools');
  
  if (tools) {
      if (currentUserRole === 'coordenador') tools.classList.remove('hidden');
      else tools.classList.add('hidden');
  }

  if (grid) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--primary-dark);">
                          <p>Carregando mídia da nuvem... ⏳</p>
                        </div>`;
      
      galleryModal.classList.add('active');
      galleryModal.style.pointerEvents = 'auto';

      try {
          // 1. Prepara arquivos locais (Hardcoded no array)
          const localMedia = (section.media || []).map(file => {
              return { name: file, url: `assets/tutorial_S${sectionId}/${file}`, isCloud: false };
          });

          // 2. Busca arquivos na nuvem no Firebase Storage
          let cloudMedia = [];
          try {
              const folderRef = storageRef(storage, `secao_${sectionId}`);
              const cloudFiles = await listAll(folderRef);
              
              // Mapeia todas as promessas de URL para buscar simultaneamente
              const cloudPromises = cloudFiles.items.map(async (itemRef) => {
                  const url = await getDownloadURL(itemRef);
                  return { name: itemRef.name, url: url, isCloud: true };
              });
              
              cloudMedia = await Promise.all(cloudPromises);
          } catch(e) {
              console.log("Pasta na nuvem ainda não existe ou está vazia para esta seção.");
          }

          // 3. Junta as duas listas
          const allMedia = [...localMedia, ...cloudMedia];

          if (allMedia.length === 0) {
              grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; background: var(--bg); border-radius: 20px;">
                                  <span style="font-size: 30px; margin-bottom: 10px; display: block;">📭</span>
                                  <p style="color:var(--muted);">Nenhuma mídia disponível para esta seção.</p>
                                </div>`;
          } else {
              grid.innerHTML = allMedia.map((fileObj, index) => {
                  const extension = fileObj.name.split('.').pop().toLowerCase();
                  const isVideo = ['mp4', 'webm', 'mov'].includes(extension);
                  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
                  
                  let mediaElement = '';
                  if (isVideo) {
                    mediaElement = `<video src="${fileObj.url}" controls preload="metadata"></video>`;
                  } else if (isImage) {
                    mediaElement = `<img src="${fileObj.url}" alt="${fileObj.name}" loading="lazy">`;
                  } else {
                    mediaElement = `<div style="height:160px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:var(--surface-soft); color: var(--primary-dark);">
                                      <a href="${fileObj.url}" target="_blank" style="text-decoration:none; color:inherit; text-align:center;">
                                        <span style="font-size:40px; margin-bottom: 5px; display:block;">📄</span>
                                        <span style="font-size: 12px; font-weight: bold;">Baixar Documento</span>
                                      </a>
                                    </div>`;
                  }

                  const actions = currentUserRole === 'coordenador' 
                      ? `<div class="media-actions">
                           <button class="action-btn" title="Excluir" onclick="window.deleteMedia(${section.id}, '${fileObj.name}', ${fileObj.isCloud})">🗑</button>
                         </div>` 
                      : '';

                  return `
                  <div class="media-card">
                    ${mediaElement}
                    <div class="media-info">
                      <div class="media-name" title="${fileObj.name}">
                         ${fileObj.isCloud ? '☁️ ' : ''}${fileObj.name}
                      </div>
                    </div>
                    ${actions}
                  </div>`;
              }).join('');
          }
      } catch (error) {
          grid.innerHTML = `<p style="color:red; text-align:center;">Erro ao carregar galeria.</p>`;
          console.error(error);
      }
  }
}

// Upload físico de arquivos
document.getElementById('uploadMedia')?.addEventListener('change', async (e) => {
  if(e.target.files.length > 0 && currentSectionForGallery !== null) {
      const sectionId = currentSectionForGallery;
      const uploadLabel = document.querySelector('label[for="uploadMedia"] span');
      
      try {
          // Atualiza visual do botão para loading
          const originalText = uploadLabel.innerHTML;
          uploadLabel.innerHTML = "⏳ Enviando...";
          document.getElementById('uploadMedia').disabled = true;

          for (let i = 0; i < e.target.files.length; i++) {
              const file = e.target.files[i];
              const fileRef = storageRef(storage, `secao_${sectionId}/${file.name}`);
              
              await uploadBytes(fileRef, file);
          }
          
          alert("Upload concluído com sucesso!");
          openGallery(sectionId); // Recarrega a galeria
      } catch (err) {
          console.error("Erro no upload", err);
          alert("Erro ao enviar o arquivo. Verifique sua conexão e tente novamente.");
      } finally {
          // Restaura o botão
          uploadLabel.innerHTML = "+";
          document.getElementById('uploadMedia').disabled = false;
          e.target.value = ''; // Limpa o input
      }
  }
});

// Apagar arquivo físico ou local
window.deleteMedia = async function(sectionId, fileName, isCloud) {
  if (confirm(`Tem certeza que deseja excluir '${fileName}' permanentemente?`)) {
      if (isCloud) {
          try {
              const fileRef = storageRef(storage, `secao_${sectionId}/${fileName}`);
              await deleteObject(fileRef);
              alert("Arquivo removido da nuvem.");
              openGallery(sectionId); // Recarrega a tela
          } catch(err) {
              console.error(err);
              alert("Erro ao excluir arquivo da nuvem.");
          }
      } else {
          // Se for arquivo local do HD (array)
          const section = sections.find(s => s.id === sectionId);
          if (section) {
              const index = section.media.indexOf(fileName);
              if (index > -1) {
                  section.media.splice(index, 1);
                  openGallery(sectionId);
              }
          }
      }
  }
};

// ==========================================
// INTEGRAÇÃO API GEMINI
// ==========================================
const chatToggle = document.getElementById('chatToggle');
const chatPanel = document.getElementById('chatPanel');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const aiInput = document.getElementById('aiInput');
const sendBtn = document.getElementById('sendBtn');

if (chatToggle && chatPanel) {
  const GEMINI_API_KEY = 'AQ.Ab8RN6IsDTmzkMajJ29JCFixs70Ryg0A9bm5FKXM4cgM6QG4Yg'; 

  chatToggle.addEventListener('click', () => {
      chatPanel.classList.add('active');
      chatPanel.style.pointerEvents = 'auto';
  });
  closeChat.addEventListener('click', () => {
      chatPanel.classList.remove('active');
      chatPanel.style.pointerEvents = 'none';
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    msgDiv.innerHTML = text.replace(/\n/g, '<br>'); 
    if (chatMessages) {
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  const systemContext = `Você é o Assistente da iCelera. Base de Conhecimento: ${JSON.stringify(sections)}`;

  async function fetchGeminiResponse(userPrompt) {
    addMessage(userPrompt, 'user');
    if (aiInput) aiInput.value = '';
    
    const loadingId = Date.now();
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message';
    loadingDiv.id = `load-${loadingId}`;
    loadingDiv.innerHTML = '<i>Analisando...</i>';
    if (chatMessages) {
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: systemContext + "\n\nPergunta: " + userPrompt }] }],
            generationConfig: { temperature: 0.2 }
          })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        let aiText = data.candidates[0].content.parts[0].text;
        aiText = aiText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');

        document.getElementById(`load-${loadingId}`)?.remove();
        addMessage(aiText, 'ai');
    } catch (error) {
        document.getElementById(`load-${loadingId}`)?.remove();
        addMessage("⚠️ Erro de conexão: " + error.message, 'ai');
    }
  }

  sendBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const text = aiInput?.value.trim();
    if(text) fetchGeminiResponse(text);
  });

  aiInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const text = aiInput?.value.trim();
      if(text) fetchGeminiResponse(text);
    }
  });
}