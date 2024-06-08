import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  describe('Basic functionality', () => {
    it('should render base element, trigger and close button', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close" />
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByText('Dropdown')).toBeInTheDocument();
    });
    it('should render children elements correctly', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(baseElement.getElementsByTagName('p').length).toEqual(2);
    });
    it('should have the correct visibility for each of the elements', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-trigger')).toBeVisible();
      expect(screen.getByTestId('dropdown-close')).not.toBeVisible();
      expect(screen.getByTestId('dropdown-body')).not.toBeVisible();
    });
    it('should be visible if "open" attribute was provided', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" isOpen closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-trigger')).toBeVisible();
      expect(screen.getByTestId('dropdown-close')).toBeVisible();
      expect(screen.getByTestId('dropdown-body')).toBeVisible();
    });
    it('should be able to close initially open dropdown', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" isOpen closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-close')).toBeVisible();
      await user.click(screen.getByTestId('dropdown-close'));
      expect(screen.getByTestId('dropdown-body')).not.toBeVisible();
    });
    it('should display dropdown on trigger click', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const trigger = screen.getByTestId('dropdown-trigger');
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
    });
    it('should close on Esc', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      await user.keyboard('Escape');
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
    });
    it('should close dropdown on close button click', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const trigger = screen.getByTestId('dropdown-trigger');
      const closeBtn = screen.getByTestId('dropdown-close');
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
      await user.click(closeBtn);
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
    });
  });
  describe('Dropdown should accept css properties via style attribute', () => {
    it('should accept and respect width and height property', () => {
      render(
        <Dropdown
          targetLabel="Dropdown"
          closeBtnLabel="Close"
          style={{
            width: '300px',
            height: '100px',
          }}
        >
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const dropdown = screen.getByTestId('dropdown-body');
      expect(dropdown.style.width).toEqual('300px');
      expect(dropdown.style.height).toEqual('100px');
    });
  });
});
