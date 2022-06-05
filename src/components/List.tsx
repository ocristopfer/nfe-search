import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Card, CardContent } from "@mui/material";
import NoResult from "./NoResult";

interface SelectedListItemProps {
  lstItens: any[];
}
const SelectedListItem = ({ lstItens }: SelectedListItemProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <Card>
      <CardContent>
        <List component="nav">
          {lstItens.length > 0 ? lstItens : <NoResult></NoResult>}
        </List>
      </CardContent>
    </Card>
  );
};
export default SelectedListItem;
