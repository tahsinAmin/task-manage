import "./ContextMenu.css";

export const ContextMenu = ({
    rightClickItem,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef,
}: {
    rightClickItem: any;
    positionX: number;
    positionY: number;
    isToggled: boolean;
    buttons: any;
    contextMenuRef: React.RefObject<HTMLMenuElement>;
}) => {
    return (
        <menu 
            style={{ top: positionY + 2 + 'px', left: positionX + 2 + 'px' }} 
            className={`context-menu ${isToggled ? 'active' : ''}`}
            ref={contextMenuRef}
        >
            {buttons.map((button: any, index: number) => {
                function handleClick(e: React.MouseEvent) {
                    e.stopPropagation();
                    button.onClick(e,rightClickItem);
                }

                if (button.isSpacer) return <hr key={index} />

                return (
                    <button key={index} onClick={handleClick} className="context-menu-button">
                        {button.text}
                        <span>{button.text}</span>
                        <span className="icon">{button.icon}</span>
                    </button>
                );
            })}
        </menu>
    );
};