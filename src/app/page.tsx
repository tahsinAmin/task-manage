"use client"
import { useRef, useState } from "react";
import { ContextMenu } from "./Components/ContextMenu/ContextMenu";

export default function Home() {
  const contextMenuRef = useRef<HTMLMenuElement>(null);
  const [contextMenu, setContextMenu] = useState({
    position: { x: 0, y: 0 },
    toggled: false,
  });
  const [people, setPeople] = useState([
    { id:1, name: "John Doe", age: 30, selected: false },
    { id:2, name: "Steve", age: 25, selected: false },
    { id:3, name: "Jackson", age: 30, selected: false },
    { id:4, name: "Stepheny", age: 30, selected: false },
  ]);
  
  const handleOnContextMenu = (e: React.MouseEvent, rightClickPerson: any) => {
    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
    const isLeft = e.clientX < window?.innerWidth / 2;


    console.log('rightClickPerson', rightClickPerson);
  };
  return (
    <div className="App">
      <ul>
        {people.map((person, index) => (
          <li onContextMenu={(e) => handleOnContextMenu(e, person)} key={index}>
            {person.name}
          </li>
        ))}
      </ul>
      <ContextMenu
        contextMenuRef={contextMenuRef}
        isToggled={contextMenu.toggled}
        positionX={contextMenu.position.x}
        positionY={contextMenu.position.y}
        buttons={[
          {
            text: "Do Something",
            icon: "😀",
            onClick: () => console.log("Hello"),
            isSpacer: false,
          },
          {
            text: "Do Something else",
            icon: "😀",
            onClick: () => console.log("Bye"),
            isSpacer: false,
          },
          {
            text: "",
            icon: "",
            onClick: () => null,
            isSpacer: true,
          },
          {
            text: "Do Something New",
            icon: "😀",
            onClick: () => console.log("world"),
            isSpacer: false,
          },
        ]}
        rightClickItem={contextMenu.rightClickItem}
      />
    </div>
  );
}
