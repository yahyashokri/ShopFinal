/**
 * ReactPortal component.
 *
 * This component renders children within a specified container element.
 * If the container element does not exist, it is created dynamically.
 * Optionally locks the body scroll when the portal is rendered.
 *
 * @param props - Component props.
 * @param props.children - Content to be rendered within the portal.
 * @param props.wrapperId - ID of the container element.
 * @param props.lockBody - Whether to lock body scroll when the portal is rendered.
 */
import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// Default props value.
const defaultReactPortalProps = {
  wrapperId: 'react-portal',
};
// Define ReactPortal props.
type ReactPortalProps = {
  children: ReactNode;
  wrapperId: string;
  lockBody?: boolean;
} & typeof defaultReactPortalProps;
// Render component.
const ReactPortal = ({
  children,
  wrapperId,
  lockBody = true,
}: ReactPortalProps) => {
  // Manage state of portal-wrapper.
  const [wrapper, setWrapper] = useState<Element | null>(null);

  useLayoutEffect(() => {
    // Find the container-element (if exist).
    let element = document.getElementById(wrapperId);
    // Bool flag whether container-element has been created.
    let created = false;
    if (!element) {
      created = true;
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', wrapperId);
      wrapper.setAttribute('class', 'font-yekan');
      var delay = setTimeout(() => {
        if (lockBody) document.body.classList.add('lock-body-scroll');
      }, 100);
      document.body.appendChild(wrapper);
      element = wrapper;
    }
    // Set wrapper state.
    setWrapper(element);
    // Cleanup effect.
    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
        document.body.classList.remove('lock-body-scroll');
      }
      clearTimeout(delay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperId]);
  // Return null on initial rendering.
  if (wrapper === null) return null;
  // Return portal-wrapper component.
  return createPortal(children, wrapper);
};
export default ReactPortal;
