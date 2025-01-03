import { CloseIcon } from '@/icons/common/CloseIcon';
import clsx from 'clsx';
import React, { useLayoutEffect, useRef, useState } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import ReactPortal from '../../HOC/PortalWrapper';
import styles from './Modal.module.css';
export interface IModal {
  children: any;
  isVisible?: boolean;
  title: string | JSX.Element;
  onClose: (_val?: any) => void;
  customWidth?: boolean;
  customHeight?: boolean;
  className?: string;
  isLtr?: boolean;
  vhIs100?: boolean;
  closedWhenOutsideClicked?: boolean;
  headerColor?: 'blue' | 'yellow';
}
const Modal: React.FC<IModal> = ({
  title,
  children,
  closedWhenOutsideClicked = true,
  isVisible = false,
  customWidth = false,
  customHeight = false,
  className,
  isLtr = false,
  vhIs100 = false,
  onClose = () => {},
  headerColor = 'blue',
}: IModal) => {
  const wrapperRef = useRef<any>();

  const [showModal, setShowModal] = useState<boolean>(true);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 80);
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 25);
    return () => {
      setShowModal(false);
      clearTimeout(timer);
    };
  }, [isVisible]);

  useOutsideClick(wrapperRef, closedWhenOutsideClicked ? closeModal : () => {});

  if (!isVisible) return null;

  return (
    <ReactPortal wrapperId={`react-portal-modal-container-${title}`}>
      <div className={clsx('blured-background')}>
        <div
          data-testid={`${title}-width`}
          className={clsx(
            styles.bottomSheet,
            'fixed',
            'bottom-0',
            'bg-white',
            'md:left-1/2',
            'md:top-1/2',
            'md:rounded-[10px]',
            'max-md:w-full',
            'md:h-min',
            'max-md:rounded-t-[10px]',
            { 'md:max-h-[430px]': !customHeight },
            { 'md:min-w-[650px]': !customWidth },
            { 'md:w-auto': !customWidth },
            showModal
              ? styles.bottomSheet_animation__open
              : styles.bottomSheet_animation__close,
          )}
        >
          <div ref={wrapperRef} className={clsx('p-4', className)}>
            <header
              className={clsx(
                'flex',
                { 'flex-row-reverse': isLtr },
                'pb-4',
                'items-center',
                'justify-between',
                'max-md:border-b-[1px]',
                'max-md:border-b-gulf-blue/5',
              )}
            >
              <div
                className={clsx(
                  'font-bold',
                  'flex-1',
                  'ml-4',
                  { 'text-cerulean-blue': headerColor === 'blue' },
                  { 'text-yellow': headerColor === 'yellow' },
                )}
              >
                {title}
              </div>
              <CloseIcon
                data-testid={`${title}-close-icon`}
                className={clsx(
                  'text-gulf-blue/50',
                  'w-2.5',
                  'h-2.5',
                  'hover:cursor-pointer',
                )}
                onClick={closeModal}
              />
            </header>
            <div
              data-testid={`${title}-height`}
              className={clsx(
                'overflow-y-auto',
                'pretty-scroll',
                'max-md:h-min',
                'max-h-max',
                { '!h-screen': vhIs100 },
                { ' max-lg:h-[300px] md:max-h-[330px]': !customHeight },
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};
export default Modal;
