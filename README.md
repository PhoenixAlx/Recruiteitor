# Recruit
Basado en 

_Version 0.1.1_    
[![Build Status](https://travis-ci.org/oslugr/polleitor.svg?branch=master)](https://travis-ci.org/oslugr/polleitor)
[![Coverage Status](https://coveralls.io/repos/github/oslugr/polleitor/badge.svg?branch=master)](https://coveralls.io/github/oslugr/polleitor?branch=master)

Sietema cliente-servidor derivado de polleitor para evaluar candidatos

La parte servidor usa LokiDB para almacenar las encuestas y resultados y funciona con REST, la parte cliente JavaScript para configurar las encuestas y enviar los resultados.

Tiene la dependendencia en NodeJS de Yerbamate
La configuración se hace en el servidor y en él se almacenan los resultados.

## Instalación referente a node

Tras clonar de este repo:
```bash
npm install
```

Ejecutar Tests (opcional):
```bash
npm test
```

Iniciar servidor:
```bash
npm start
`
``

## Instalación referente a python
Recruit lleva incorporado un script de python para realizar el análisis de sentimentos de los comentarios.

* app/sentiment.py

Está pensado para python 3, necesitarás instalar el paquete nltk. Al hacer npm install se ejecuta install_sentiment_python.sh que lanza el primer y el tercer punto de la siguiente lista:

* sudo pip install -U nltk
* opcionalmente, sudo pip install -U numpy
* Y para descargar los corpus ejecuta : python -m nltk.downloader -d /usr/local/share/nltk_data -u https://gist.githubusercontent.com/demidovakatya/61dab385d74065ae825c80496a197980/raw/c6ff7fbf44265c7f8c9e961e3e1158cd812d6af1/index.xml all 



Una vez lanzado tiene tres páginas:

* Index.html : Que sirve para gestionar una ventana de tiempo en la que permanecerá abierta
* feedback.html: Que a parte de la gestión de la ventana de tiempo también es la que recoge las respuestas a las cuestiones configuradas.
* result.html: Que es la que muestra los resultados en gráficas.




Si usas [Heroku](http://heroku.com), cambia `repository` en el fichero de configuración `app.json` y

    heroku login
	heroku git:remote -a mi-proyecto-en-heroku
	git push heroku master


## Documentación de Polleitor ya iré adaptandola a Recruit



Para ver la documentación de Polleitor [Click](https://oslugr.github.io/polleitor) 

Los ficheros principales son:

* [Rutas](http://oslugr.github.io/polleitor/routes.html)
* [Configuración](http://oslugr.github.io/polleitor/config.html),
  donde efectivamente se crean las encuestas



## API Polleitor
Se accede al servicio mediante una API REST:

| **Método** | **Ruta**           | **Descripción**       | **Petición**| **Respuesta**|
|:----------:|:------------------:|:---------------------:|:-----------:|:------------:|
| GET        |`:poll`             | Devuelve las preguntas de una encuesta |Sin cuerpo en la petición|`[{question,[options],id}]`|
| GET        |`:poll/resultados`  | Devuelve el poll y los resultados|Sin cuerpo en la petición|`[{question,[options],id,[answers]}]`|
| PUT        |`:poll`             | Envía respuestas a las preguntas de un poll |`[{id,answer}]`|`{poll,updates,failedUpdates}`|

## Variaciones de la API en Recruit

* Nuevos tipos de pregunta. Existe options, ranks y textarea. Cada uno se presenta de una forma y se controla su guardado de forma diferente.
* Cuando se solicitan las repuestas ahora el valor de la respuesta del usuario que la solicita está en el campo value y todas las respuestas incluyendo la propia están almacenadas en el array datas_answer. También se devuelve el token del usuario que lo solicita; esto es útil para temas de comprobación y selección.




## Quien ha montado esto

> Desarrollado por la Oficina de Software Libre bajo licencia MIT
> Documentación completa en <https://oslugr.github.io/polleitor>
> La adaptación a Recruiteitor Francisco Manuel Alexander Bueno Pérez [@Phoenix_alx](https://github.com/PhoenixAlx).
