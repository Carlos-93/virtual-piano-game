export interface PianoKey {
    note:  string;
    key:   string;
    color: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}