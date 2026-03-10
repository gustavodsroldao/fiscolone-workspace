import { select, Separator } from "@inquirer/prompts";
import { spawn } from "child_process";
import os from "os";
import path from "path";
import fs from "fs";
import figlet from "figlet";
import chalk from "chalk";
import boxen from "boxen";

const home = os.homedir();

const projects = {
    fiscoolWeb: path.join(home, "Documents", "GitHub", "fiscool_web"),
    fiscoolApi: path.join(home, "Documents", "GitHub", "fiscool_api", "FiscoolAPI"),
    tributoneWeb: path.join(home, "Documents", "GitHub", "tributone_web"),
    tributoneApi: path.join(home, "Documents", "GitHub", "tributone_api")
};

function run(command, cwd, name) {

    if (!fs.existsSync(cwd)) {
        console.error(chalk.red("Diretório não encontrado:"), cwd);
        return;
    }

    const processo = spawn(command, {
        cwd,
        shell: true
    });

    processo.stdout.on("data", data => {
        console.log(chalk.blue(`[${name}]`), data.toString());
    });

    processo.stderr.on("data", data => {
        console.log(chalk.yellow(`[${name}]`), data.toString());
    });

    processo.on("error", err => {
        console.error(chalk.red(`[${name}] erro:`), err);
    });
}

function renderHeader() {

    const title = figlet.textSync("Fiscolone", {
        horizontalLayout: "default"
    });

    const banner = chalk.cyan(title);

    const subtitle = chalk.yellow(
        "Atenção: Ao rodar todo o eco-sistema pode ser necessário ajustar as portas.\n" +
        "Verifique os arquivos .env de cada projeto para evitar conflitos."
    );

    console.log(
        boxen(`${banner}\n${subtitle}`, {
            padding: 1,
            borderStyle: "round",
            borderColor: "cyan"
        })
    );
}

function showServicos() {

    console.log("\nServiços detectados:\n");

    console.log(chalk.green("✔ fiscool-web"));
    console.log(chalk.green("✔ fiscool-api"));
    console.log(chalk.green("✔ tributone-web"));
    console.log(chalk.green("✔ tributone-api"));

    console.log();
}

async function iniciar() {

    renderHeader();

    showServicos();

    const service = await select({
        message: "Quais serviços iniciar?",
        choices: [

            new Separator(chalk.gray("── Fiscool ──")),

            { name: "API Fiscool", value: "fiscoolApi" },
            { name: "Front Fiscool", value: "fiscoolWeb" },
            { name: "Fiscool (Front + API)", value: "fiscoolStack" },
            { name: "Fiscool Full (Front + API Fiscool + API Tributone)", value: "fiscoolFull" },

            new Separator(chalk.gray("── Gestão Fiscal Integrada ──")),

            { name: "API Tributone", value: "tributoneApi" },
            { name: "Front Tributone", value: "tributoneWeb" },
            { name: "Tributone (Front + API)", value: "tributoneStack" },
            { name: "Tributone Full (Front + API Tributone + API Fiscool)", value: "tributoneFull" },

            new Separator(chalk.gray("── Eco-sistema Completo ──")),

            { name: "Todos os serviços", value: "all" }
        ]
    });

    console.log(chalk.cyan("\nIniciando serviços...\n"));

    switch (service) {

        case "fiscoolWeb":
            run("npm run dev", projects.fiscoolWeb, "FISCOOL-WEB");
            break;

        case "fiscoolApi":
            run("dotnet watch run", projects.fiscoolApi, "FISCOOL-API");
            break;

        case "tributoneWeb":
            run("npm run dev", projects.tributoneWeb, "TRIBUTONE-WEB");
            break;

        case "tributoneApi":
            run("dotnet watch run", projects.tributoneApi, "TRIBUTONE-API");
            break;

        case "fiscoolStack":
            run("npm run dev", projects.fiscoolWeb, "FISCOOL-WEB");
            run("dotnet watch run", projects.fiscoolApi, "FISCOOL-API");
            break;

        case "fiscoolFull":
            run("npm run dev", projects.fiscoolWeb, "FISCOOL-WEB");
            run("dotnet watch run", projects.fiscoolApi, "FISCOOL-API");
            run("dotnet watch run", projects.tributoneApi, "TRIBUTONE-API");
            break;

        case "tributoneStack":
            run("npm run dev", projects.tributoneWeb, "TRIBUTONE-WEB");
            run("dotnet watch run", projects.tributoneApi, "TRIBUTONE-API");
            break;

        case "tributoneFull":
            run("npm run dev", projects.tributoneWeb, "TRIBUTONE-WEB");
            run("dotnet watch run", projects.tributoneApi, "TRIBUTONE-API");
            run("dotnet watch run", projects.fiscoolApi, "FISCOOL-API");
            break;

        case "all":
            run("npm run dev", projects.fiscoolWeb, "FISCOOL-WEB");
            run("dotnet watch run", projects.fiscoolApi, "FISCOOL-API");
            run("npm run dev", projects.tributoneWeb, "TRIBUTONE-WEB");
            run("dotnet watch run", projects.tributoneApi, "TRIBUTONE-API");
            break;
    }
}

iniciar();