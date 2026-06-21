const APP_NAME = "KN7 SCANNER"

// 🔗 (opcional) update remoto futuro
const VERSION = "1.0"

async function showMenu() {
  let menu = new Alert()
  menu.title = APP_NAME
  menu.message = "Escolha uma opcao"
  menu.addAction("Scanner de Rede")
  menu.addAction("Info do iPhone")
  menu.addAction("Testar Conexao")
  menu.addAction("Sair")

  let choice = await menu.presentSheet()

  if (choice == 0) await networkScan()
  if (choice == 1) await deviceInfo()
  if (choice == 2) await testConnection()
}

async function networkScan() {
  let msg = "🔍 SCANNER DE REDE\n\n"

  try {
    let ipReq = new Request("https://api.ipify.org?format=json")
    let ipData = await ipReq.loadJSON()

    msg += "📡 IP Publico: " + ipData.ip + "\n"
  } catch {
    msg += "IP: erro\n"
  }

  msg += "\n⚠️ Verificacao basica:\n"
  msg += "- Scriptable nao acessa processos do iOS\n"
  msg += "- Nao e possivel detectar cheats de jogos\n"
  msg += "- Apenas analise de rede\n"

  let a = new Alert()
  a.title = APP_NAME
  a.message = msg
  a.addAction("OK")
  await a.present()
}

async function deviceInfo() {
  let msg =
    "📱 INFO DO DISPOSITIVO\n\n" +
    "iOS Version: " + Device.systemVersion() + "\n" +
    "Nome: " + Device.name() + "\n" +
    "Modelo: " + Device.model() + "\n"

  let a = new Alert()
  a.title = APP_NAME
  a.message = msg
  a.addAction("OK")
  await a.present()
}

async function testConnection() {
  let msg = "🌐 TESTE DE CONEXAO\n\n"

  try {
    let req = new Request("https://www.google.com")
    await req.load()

    msg += "Status: ONLINE ✅"
  } catch {
    msg += "Status: OFFLINE ❌"
  }

  let a = new Alert()
  a.title = APP_NAME
  a.message = msg
  a.addAction("OK")
  await a.present()
}

// START
await showMenu()
