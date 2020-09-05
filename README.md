# Videomaker

Robô que cria videos a partir de um termo fornecido pelo usuário. Ele procura um termo no Wikipedia através do algoritmo Wikipedia Response disponível na plataforma [Algorthimia](https://algorithmia.com/).

O conteúdo é sanitizado com a ajuda da biblioteca [Sentence Boundary Detection](https://www.npmjs.com/package/sbd).

A analise do texto foi feita usando a Api do Watson [Natural Language Understanding](https://natural-language-understanding-demo.ng.bluemix.net), a qual acessamos usando o módulo [Watson Developer Cloud](https://www.npmjs.com/package/watson-developer-cloud).

Pesquisa de imagens feita usando a Api Google Custom Search 




**Este projeto está sendo desenvolvido seguindo os videos do [Filipe Deschamps](https://github.com/filipedeschamps).**

Você pode conferir o repositório do projeto original [aqui](https://github.com/filipedeschamps/video-maker).




### Outros módulos usados:

+ [Google APIs Node.js Client](https://www.npmjs.com/package/googleapis)
+ [Image Downloader](https://www.npmjs.com/package/image-downloader)



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
