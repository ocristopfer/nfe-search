import teste from "./listaCidade.json"
class SiteNfe {
  public getListFiltered = (search: string): any => {

    var teste1 = teste as [];

    console.log(teste1.length)
   

    return this.getList().map((site) => {
      if (
        search === "" ||
        site.cidade.toLowerCase().includes(search.toLowerCase())
      ) {
        return site;
      }

      return null;
    });
  };

  public getList = () => {
    return [
      {
        uf:"SP",
        cidade: "Barueri",
        url: "https://www.barueri.sp.gov.br/nfe/wfConsultaNotaPorAutenticidade.aspx",
        isIframeSuported: false
      },
      {
        uf:"RJ",
        cidade: "Rio de Janeiro",
        url: "https://notacarioca.rio.gov.br/documentos/verificacao.aspx",
        isIframeSuported: false
      },{
        uf:"RJ",
        cidade: "Duque de Caxias",
        url: "https://www.issnetonline.com.br/duquedecaxias/online/NotaDigital/VerificaAutenticidade.aspx",
        isIframeSuported: false
      },{
        uf:"RJ", 
        cidade: "Mesquita",
        url: "https://nfe.mesquita.rj.gov.br/nfe/form.jsp?sys=NFE&action=openform&formID=8331",
        isIframeSuported: false
      },{
        uf:"RJ",
        cidade:"Campos dos Goytacazes",
        url: "https://goytacazes.ginfes.com.br/",
        isIframeSuported: false
      }
    ];
  };
}

export default SiteNfe;
