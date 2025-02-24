function fibonacci(n) {
    // Ako n nije pozitivan, vraća se prazan niz
    if (n <= 0) return [];
    
    // Ako je n jednako 1, vraća se niz sa samo jednim elementom 0
    if (n === 1) return [0];
    
    // Inicijalizacija prvih dvaju elemenata
    let fib = [0, 1];
    
    // Generiranje ostalih elemenata Fibonacci niza
    for (let i = 2; i < n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    
    return fib;
  }
  
  // Primjer poziva funkcije:
  console.log(fibonacci(7)); // Očekivani izlaz: [0, 1, 1, 2, 3, 5, 8]
  