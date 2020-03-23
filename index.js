// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// identity :: x -> x
const identity = x => x;

export class Task{
    constructor(fork) {
      this.fork = fork;
    }
  
    static rejected(x) {
      return new Task((reject, _) => reject(x));
    }
  
    // ----- Pointed (Task a)
    static of(x, promise = false) {
      return new Task((reject, resolve) => {

        if(promise !== true){
            resolve(x);
            return;
        }

        x.then((response) => resolve(response))
         .catch((err) => {
            if(reject !== null && reject !== undefined){
                reject(err);
            }
        });

      });
    }
  
    // ----- Functor (Task a)
    map(fn) {
      return new Task((reject, resolve) => this.fork(reject, compose(resolve, fn)));
    }
  
    // ----- Applicative (Task a)
    ap(f) {
      return this.chain(fn => f.map(fn));
    }
  
    // ----- Monad (Task a)
    chain(fn) {
      return new Task((reject, resolve) => this.fork(reject, x => fn(x).fork(reject, resolve)));
    }
  
    join() {
      return this.chain(identity);
    }
  }