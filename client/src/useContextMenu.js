import { useEffect, useState, useCallback } from "react";

const useContextMenu = () => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback(
    (e) => {
      if (e.clientX > 1024) return
      if (e.clientY > 610) return

      e.preventDefault();

      setXPos(`${e.clientX - 60}px`);

      if (e.clientY > 145) {

        setYPos(`${30}px`);
      }
      else {
        setYPos(`${e.clientY - 50}px`);
      }
      setShowMenu(true)

    },
    [setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPos, yPos, showMenu };
};

export default useContextMenu