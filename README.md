# XmlParser

Uma classe Typescript para leitura de xml usando XPath.<br>

Exemplo:
```js


let parser = new Parsers.XmlParser(stringXml);

//Retorna o prefixo para um determinado namespace.
let prefixo = xmlParser.prefixoPara("http://www.site.com.br");

//Le a tag desejada no xml. O prefixo pode ser omitido caso a tag não faça uso.
//Se a tag não for encontrada é retornada uma string vazia.
let nomeCliente = xmlParser.obterString(`//${prefixo}:nomeCliente`);

//É possível ler uma lista de tags e obter um array com os valores encontrados.
//Aqui é retornado um array bidimensional, onde para cada pedido encontrado
//é retornado um array com seus respectivos nós filhos.
//Caso não seja encontrado é retornado um array vazio.
let pedidos = xmlParser.obterMultiString("//pedido", [".//nomeProduto", ".//valorProduto"]);


```
