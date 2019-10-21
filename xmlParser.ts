
interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>;
}

namespace Parsers {

    export class XmlParser {
        private doc: any;
        private xmlNsps = {};
        private nsResolver = (pf) => this.xmlNsps[pf];

        constructor(content){
            this.obterNamespaces(content);
            this.doc = new DOMParser().parseFromString(content, 'text/xml');
        }

        private obterNamespaces(content){
            let result = content.matchAll(/xmlns:([\w-]+="[\w:.\/\-#]+")/gi);

            let matches = Array.from(result);

            for(let c1=0; c1 < matches.length; c1++)
            {
                let arrNs = matches[c1][1].split("=");
                this.xmlNsps[arrNs[0]] = arrNs[1].replace(/\"/g, "");
            }
        }

        prefixoPara(ns){
            for(let key in this.xmlNsps){
                let value = this.xmlNsps[key];

                if (value.toUpperCase() == ns.toUpperCase()) return key;
            }

            return null;
        }
    
        obterString(path: string){
            return this.doc.evaluate(path, this.doc, this.nsResolver, XPathResult.STRING_TYPE, null).stringValue;
        }
        
        obterMultiString(expressaoPai: string, expressoesFilho: Array<string>){
            let resultado = this.doc.evaluate(expressaoPai, this.doc, this.nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            let resposta = [];
            let noPai = resultado.iterateNext();

            while(noPai){

                let registro = [];

                for(const item of expressoesFilho){
                    registro.push(this.doc.evaluate(item, noPai, this.nsResolver, XPathResult.STRING_TYPE, null).stringValue);
                }

                resposta.push(registro);
                noPai = resultado.iterateNext();
            }

            return resposta;
        }
    }

}