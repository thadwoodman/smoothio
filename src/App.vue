<template>
  <div id="app">
    <nav>
      <router-link class="logo" to="/">Smoothio</router-link>
    </nav>
    <div class="router-view-container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  width: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;

  input[type="text"] {
    font-size: 1.5em;
    border: 2px solid #0069ed;
    padding: 5px 5px;
  }

  ul {
    padding: 0;
  }

  button {
    display: inline-block;
    border: none;
    padding: 1.5rem 2rem;
    margin: 0;
    text-decoration: none;
    background: #0069ed;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  button:hover,
  button:focus {
    background: #0053ba;
  }

  button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  button:active {
    transform: scale(0.99);
  }

  a {
    text-decoration: none;
    color: #322828;
    font-weight: bold;
  }

  nav {
    border-bottom: 1px solid whitesmoke;
    text-align: left;
    padding: 20px;
    .logo {
      font-weight: 500;
    }
  }

  .router-view-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 50px 0;
  }

  .inline-form-container {
    display: flex;
    justify-content: flex-end;
    .inline-form {
      margin-right: 50px;
      label,
      input {
        display: block;
      }
    }
  }
}

nav #nav a.router-link-exact-active {
  color: #42b983;
}
</style>
