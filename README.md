
### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

### Lint

To run ESLint:

```sh
npm run lint
```

### Preview

To preview the production build:

```sh
npm run preview
```

## Configuration

- API endpoints are configured in [`src/constants/api.ts`](src/constants/api.ts).
- Theme settings are in [`src/constants/theme.ts`](src/constants/theme.ts).
- Routing is defined in [`src/routes/RouteList.tsx`](src/routes/RouteList.tsx).

## Usage

- Browse products on the main page.
- Use the search bar and price slider to filter products.
- Add products to your cart.
- View and modify your cart on the checkout page.
- Submit your order and view the order summary.

## Contributing

Feel free to fork and submit pull requests!

## License

This project is for educational/demo purposes.

---

**Made with React, TypeScript, and Vite.**