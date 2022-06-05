import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import InputSearch from "../components/InputSearch";
import SelectedListItem from "../components/List";
import SiteNfe from "../services/SiteNfe";

const NfeSearch = () => {
  const [lstItens, setlstItens] = React.useState([] as any);
  const [urlIframe, setUrlIframe] = React.useState("");
  const BuscarUrls = (searchTern: string) => {
    setUrlIframe('')
    const lstResult: any[] = new SiteNfe().getListFiltered(searchTern);
    if (lstResult.length > 0) {
      const lstResultFiltered = lstResult.map((itens, index) => {
        if (itens !== null) {
          return (
            <ListItemButton
              key={index.toString()}
              id={index.toString()}
              onClick={(event) => {
                console.log(itens.isIframeSuported)
                if (itens.isIframeSuported) {
                  setUrlIframe(itens.url);
                } else {
                   window.open(itens.url, "_blank");
                }
              }}
            >
              <ListItemText>{itens.cidade}</ListItemText>
            </ListItemButton>
          );
        }
        return false;
      });
      lstResultFiltered.length > 0
        ? setlstItens(lstResultFiltered)
        : setlstItens([]);
    }
  };
  return (
    <>
      <InputSearch callBackFunc={BuscarUrls}></InputSearch>
      {urlIframe !== "" ? <iframe title='Pagina' src={urlIframe} width="100%" height={800}></iframe> : <SelectedListItem key="0" lstItens={lstItens}></SelectedListItem>}
    </>
  );
};
export default NfeSearch;
