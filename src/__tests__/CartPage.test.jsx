import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CartPage from '../Pages/CartPage';
import { useCart } from '../Context/CartContext';

vi.mock('../Context/CartContext', () => ({
    useCart: vi.fn()
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

describe('CartPage UI Component', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('renders empty cart state when cart has no items', () => {
        useCart.mockReturnValue({
            cart: [],
            updateQuantity: vi.fn(),
            removeFromCart: vi.fn(),
            getCartTotal: () => 0,
            placeOrder: vi.fn()
        });

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Browse Menu' })).toBeInTheDocument();
    });

    it('renders cart summary calculations and lists cart items', () => {
        useCart.mockReturnValue({
            cart: [
                {
                    id: 'item-1',
                    name: 'Double Burger',
                    price: '$10.00',
                    quantity: 2,
                    image: '',
                    category: 'Burgers'
                }
            ],
            updateQuantity: vi.fn(),
            removeFromCart: vi.fn(),
            getCartTotal: () => 20.00,
            placeOrder: vi.fn()
        });

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Double Burger')).toBeInTheDocument();
        expect(screen.getAllByText('$20.00')[0]).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Proceed to Checkout' })).toBeInTheDocument();
    });

    it('shows validation errors when submitting an empty checkout form', async () => {
        const user = userEvent.setup();
        useCart.mockReturnValue({
            cart: [
                { id: '1', name: 'Burger', price: '$5.00', quantity: 1, image: '' }
            ],
            updateQuantity: vi.fn(),
            removeFromCart: vi.fn(),
            getCartTotal: () => 5.00,
            placeOrder: vi.fn()
        });

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: 'Proceed to Checkout' }));

        await user.click(screen.getByRole('button', { name: 'Place Order' }));

        expect(screen.getByText('Full name is required.')).toBeInTheDocument();
        expect(screen.getByText('Delivery address is required.')).toBeInTheDocument();
        expect(screen.getByText('Phone number is required.')).toBeInTheDocument();
    });

    it('shows error if phone number is not exactly 10 digits', async () => {
        const user = userEvent.setup();
        useCart.mockReturnValue({
            cart: [
                { id: '1', name: 'Burger', price: '$5.00', quantity: 1, image: '' }
            ],
            updateQuantity: vi.fn(),
            removeFromCart: vi.fn(),
            getCartTotal: () => 5.00,
            placeOrder: vi.fn()
        });

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: 'Proceed to Checkout' }));

        await user.type(screen.getByLabelText(/Full Name/i), 'Jane Doe');
        await user.type(screen.getByLabelText(/Delivery Address/i), '456 Side Street, NY');
        await user.type(screen.getByLabelText(/Phone Number/i), '123');

        await user.click(screen.getByRole('button', { name: 'Place Order' }));

        expect(screen.getByText('Phone number must be exactly 10 digits.')).toBeInTheDocument();
    });

    it('calls placeOrder callback and routes to /order on successful checkout submit', async () => {
        const user = userEvent.setup();
        const mockPlaceOrder = vi.fn().mockResolvedValue({ id: 'order-123' });

        useCart.mockReturnValue({
            cart: [
                { id: '1', name: 'Burger', price: '$5.00', quantity: 1, image: '' }
            ],
            updateQuantity: vi.fn(),
            removeFromCart: vi.fn(),
            getCartTotal: () => 5.00,
            placeOrder: mockPlaceOrder
        });

        render(
            <MemoryRouter>
                <CartPage />
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: 'Proceed to Checkout' }));

        await user.type(screen.getByLabelText(/Full Name/i), 'Jane Doe');
        await user.type(screen.getByLabelText(/Delivery Address/i), '456 Side Street, NY');
        await user.type(screen.getByLabelText(/Phone Number/i), '1234567890');

        await user.click(screen.getByRole('button', { name: 'Place Order' }));

        await waitFor(() => {
            expect(mockPlaceOrder).toHaveBeenCalledWith({
                name: 'Jane Doe',
                address: '456 Side Street, NY',
                phone: '1234567890'
            });
            expect(mockNavigate).toHaveBeenCalledWith('/order');
        });
    });
});
