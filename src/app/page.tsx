"use client"

import { useEffect, useRef, useState } from "react";
import { ContextMenu } from "./Components/ContextMenu/ContextMenu";

export default function Home() {
  const contextMenuRef = useRef<HTMLMenuElement>(null);
  const [contextMenu, setContextMenu] = useState({
    position: { 
      x: 0,
      y: 0 
    },
    toggled: false,
  });
  const [people, setPeople] = useState([
    { id:1, name: "John Doe", age: 30, selected: false },
    { id:2, name: "Steve", age: 25, selected: false },
    { id:3, name: "Jackson", age: 30, selected: false },
    { id:4, name: "Stepheny", age: 30, selected: false },
  ]);
  
  const handleOnContextMenu = (e: React.MouseEvent, rightClickedPerson: any) => {
    e.preventDefault();

    const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
    const isLeft = e.clientX < window?.innerWidth / 2;
    let x
    let y =  e.clientY

    if (isLeft) {
      x = e.clientX
    } else {
      x = e.clientX - contextMenuAttr?.width
    } 
    
    setContextMenu({
      position: {
        x, 
        y
      },
      toggled: true,
    });
    
    
    // Update the selected state for the person
    setPeople(
      people.map(person => ({
      ...person,
      selected: person.id === rightClickedPerson.id
    }))
    );
    console.log(rightClickedPerson);
  };

  function resetContextMenu() {
    setPeople(
      people.map(person => ({
      ...person,
      selected: false
    }))
    );
    setContextMenu({
      position: { 
        x: 0,
        y: 0 
      },
      toggled: false,
    });
  }

  useEffect(() => {
    function handler (e) {
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          resetContextMenu();
        }
      }
    }
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    }
  }, [contextMenu]);
  return (
    <div className="App">
      <ul>
        {people.map((person, index) => {
          return (
            <li
            onContextMenu={(e) => handleOnContextMenu(e, person)}
            key={index}
            className={person.selected ? "selected" : ""}
          >
            {person.name}
          </li>
          )
        })}
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
            onClick: () => alert("Hello"),
            isSpacer: false,
          },
          {
            text: "Do Something else",
            icon: "😀",
            onClick: () => alert("Bye"),
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
            onClick: () => alert("world"),
            isSpacer: false,
          },
        ]}
        rightClickItem={contextMenu?.rightClickItem}
      />
    </div>
  );
}
