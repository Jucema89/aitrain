<p align="center">
  <a href="https://strapi.io/#gh-light-mode-only">
    <img src="https://aitrain.app/assets/img/Aitrain-logo.png" width="218px" alt="Aitrain logo" />
  </a>
  <a href="https://strapi.io/#gh-dark-mode-only">
    <img src="https://aitrain.app/assets/img/Aitrain-logo-color-white.png" width="218px" alt="Aityrain logo" />
  </a>
</p>

<h3 align="center">Plataforma de Finetuning Open Source.</h3>
<p align="center">Transforma los documentos de tu empresa o negocio en documentos validos para que la IA aprenda, corriendo en local sin comprometer información sensible</p>
<p align="center"><a href="https://aitrain.app/">App Produccion</a> · <a href="https://dev.aitrain.app/">App Desarrollo</a> · <a href="https://hub.docker.com/r/juliodaza/aitrain-backend">Imagen Docker Backend</a> · <a href="https://github.com/Jucema89/aitrain-API">Github Backend</a></p>
<br />


<br>

<p align="center">
  <a href="https://strapi.io">
    <img src="https://aitrain.app/assets/img/Aitrain_project.png" alt="Aitrain Preview Project" />
  </a>
</p>
<br>

## Como usarlo

Copia el docker compose y ejecutalo: Con el archivo se bajara la ultima imagen de **aitrain-backend** y se crearan dos servicios: uno con la base de datos de Postgres y la otra con el backend de Node, por defecto corre en el puerto 3900. Te diriges a la web de [Aitrain app](https://aitrain.app/) y en la sección de configuración colocas la url de backend y la Api Key que generas en [OpenAi](https://platform.openai.com/api-keys) ya con eso puedes generar los documentos .jsonl para entrenamiento y luego con ellos entrenar la IA de OpenAI.
> **Nota:** De momento solo **GPT-3.5** y sus versiones son las habilitadas para Finetuning.

            ##docker-compose.yml
            version: '3.8'
            services:

              db:
                image: postgres
                environment:
                  POSTGRES_DB: aitrain
                  POSTGRES_USER: postgres
                  POSTGRES_PASSWORD: aitrainPass
                ports:
                  - "6432:5432"
                volumes:
                  - postgres_data:/var/lib/postgresql/data

              app:
                image: juliodaza/aitrain-backend:latest
                ports:
                  - "3900:3900"
                environment:
                  DATABASE_URL: "postgresql://postgres:aitrainPass@db:5432/aitrain"
                depends_on:
                  - db

            volumes:
              postgres_data:

## Correr en Desarollo 
Si deseas correr la app en local debes tener la versión 20 de Node o superior:
`git clone git@github.com:Jucema89/aitrain.git`
`npm i`
`ng serve`

Este proyecto esta creado con Angular como Framework de frontend y los estilos vienen de [Preline](https://preline.co/docs/index.html) un framework de Estilos basado en tailwind. 
