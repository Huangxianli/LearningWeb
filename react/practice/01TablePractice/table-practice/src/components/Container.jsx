function Container ({ children }) {
  return (
    <>
      <section style={{ border: '1px solid red', margin: '20px', padding: '20px' }}>
        {children}
      </section>
    </>
  );
};
export default Container;