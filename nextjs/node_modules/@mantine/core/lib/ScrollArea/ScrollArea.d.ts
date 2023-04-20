import React from 'react';
import { DefaultProps, Selectors } from '@mantine/styles';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import useStyles, { ScrollAreaStylesParams } from './ScrollArea.styles';
export type ScrollAreaStylesNames = Selectors<typeof useStyles>;
export interface ScrollAreaProps extends DefaultProps<ScrollAreaStylesNames, ScrollAreaStylesParams>, React.ComponentPropsWithRef<'div'> {
    variant?: string;
    /** Scrollbar size */
    scrollbarSize?: number | string;
    /** Scrollbars type */
    type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never';
    /** Scroll hide delay in ms, for scroll and hover types only */
    scrollHideDelay?: number;
    /** Reading direction of the scroll area */
    dir?: 'ltr' | 'rtl';
    /** Should scrollbars be offset with padding */
    offsetScrollbars?: boolean;
    /** Get viewport ref */
    viewportRef?: React.ForwardedRef<HTMLDivElement>;
    /** Props added to the viewport element */
    viewportProps?: React.ComponentPropsWithRef<'div'>;
    /** Subscribe to scroll position changes */
    onScrollPositionChange?(position: {
        x: number;
        y: number;
    }): void;
}
export declare const _ScrollArea: any;
export interface ScrollAreaAutosizeProps extends ScrollAreaProps {
}
declare const ScrollAreaAutosize: React.ForwardRefExoticComponent<Pick<ScrollAreaAutosizeProps, "m" | "mx" | "my" | "mt" | "mb" | "ml" | "mr" | "p" | "px" | "py" | "pt" | "pb" | "pl" | "pr" | "bg" | "c" | "opacity" | "ff" | "fz" | "fw" | "lts" | "ta" | "left" | "right" | "lh" | "fs" | "tt" | "td" | "w" | "miw" | "maw" | "h" | "mih" | "mah" | "bgsz" | "bgp" | "bottom" | "top" | "bgr" | "bga" | "pos" | "inset" | "display" | "property" | "color" | "translate" | "hidden" | "style" | "children" | "className" | "sx" | "classNames" | "styles" | "unstyled" | "slot" | "title" | "variant" | "defaultValue" | "onChange" | "id" | "key" | "defaultChecked" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "lang" | "placeholder" | "spellCheck" | "tabIndex" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "type" | "offsetScrollbars" | "scrollbarSize" | "scrollHideDelay" | "viewportRef" | "viewportProps" | "onScrollPositionChange"> & React.RefAttributes<HTMLDivElement>>;
export declare const ScrollArea: ForwardRefWithStaticComponents<ScrollAreaProps, {
    Autosize: typeof ScrollAreaAutosize;
}>;
export {};
//# sourceMappingURL=ScrollArea.d.ts.map