## Simple Bitcoin Public Private Key Generator created in React

### Use the keys created from this app at your own risk. I will not be held responsible for any lost or stolen Bitcoin from the abuse, misuse, or misunderstanding of this app.

App Demo hosted at: https://bitcoinkeygen.netlify.app/

See genKeys.js under src to see the algorithms used to create Bitcoin private and public keys.

If Generate From Text is clicked, a private key will be create by hashing the text with SHA512 and salting it with the current timestamp. The hash is rotated and the process is repeated 100 times.

If Randomly Generate is click, a private key will be randomly generated using the secure-random library.

Interesting article on random numbers: https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba

Key pairs can be verified at https://blockchain.com
