# Videomaker

Robô que cria videos a partir de um termo fornecido pelo usuário. Ele procura um termo no Wikipedia através do algoritmo Wikipedia Response disponível na plataforma [Algorthimia](https://algorithmia.com/).

O conteúdo é sanitizado com a ajuda da biblioteca [Sentence Boundary Detection](https://www.npmjs.com/package/sbd).

A analise do texto foi feita usando a Api do Watson [Natural Language Understanding](https://natural-language-understanding-demo.ng.bluemix.net), a qual acessamos usando o módulo [Watson Developer Cloud](https://www.npmjs.com/package/watson-developer-cloud).

Pesquisa de imagens feita usando a Api Google Custom Search.

A manipulação de imagens no projeto original é feita com o [Gm]{https://www.npmjs.com/package/gm}, mas por ter algumas limitações com a manipulação de imagens com essa lib, e também por boatos de que ela apresenta brechas de segurança, busquei outras lib, encontrando o [Sharp](https://www.npmjs.com/package/sharp), e mais tarde o [Jimp](https://www.npmjs.com/package/jimp). O projeto está com essas duas últimas, ainda não escolhi com qual deles vou ficar.




**Este projeto está sendo desenvolvido seguindo os videos do [Filipe Deschamps](https://github.com/filipedeschamps).**

Você pode conferir o repositório do projeto original [aqui](https://github.com/filipedeschamps/video-maker).




### Outros módulos usados:

+ [Google APIs Node.js Client](https://www.npmjs.com/package/googleapis)
+ [Image Downloader](https://www.npmjs.com/package/image-downloader)
+ [GraphicsMagick and ImageMagick for node](https://www.npmjs.com/package/gm)


### Aplicatções requeridas:
+ [ImageMagick](https://imagemagick.org/)


### Anotações:

**Estrutura de dados usada:**

```javascript
content: {
    searchTerm: "...",
    prefix: "...",
    sourceContentOriginal: "...",
    sourceContentSanitized: "...",
    sentences: [
        text: "...",
        keywords: ["..."],
        images: ["..."]
    ]
}
```


**Progresso**

- **Espeficicar tarefas e escopo**

- **Orquestrador**                  - ok
- Perguntar pelo termo da busca     - ok
- Perguntar pelo prefixo            - ok
- iniciar o robô de texto           - ok
- iniciar o robô de imagens         - ok
- iniciar o robô de vídeo           - ok
- iniciar o robô do youtube         - ok


- **Robô de texto**                 - ok
- Estruture de dados                - ok
- pegar conteúdo do wikipedia       - ok
- limpar o conteúdo                 - ok
- quebrar em sentenças              - ok
- pegar a interpretação do watson   - ok
- adicionar tags (o watson devolve) - ok
- salvar estrutura de dados         - ok


- **robô de imagens**               - ok
- carregar a estrutura de dados     - ok
- buscar as imagens no goole        - ok
- baixar as imagens                 - ok
- salvar a estrutura de dados       - ok

- **robô de vídeo**
- preparar/redimensionar as imagens - ok 
- criar as sentenças com imagens    - ok
- criar a thumbnail                 - ok
- renderizar com after effects

- **robô do youtube**

- autenticar com o OAuth
- upload do vídeo
- upload da thumb
- 
