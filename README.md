# JavaScript Promise Functor

Functional programming functor for asynchronous task. This is simple library designed for making promise handling easier.

## Example 1 --

```js
import axios from 'axios';
import {Task} from "index";

const apiPoint = "https://example.com/api/123";

Task.of(axios.post(apiPoint, {"key": "1234"}), true).fork((err) => console.log("error: ", err), (resp) => console.log("response: ", resp))
```

In above example, `Task` utility static method `of` creates a task object with given data or value. Second parameter specifies whether the first parameter is a Promise. When a promise is provided, next functions provided in object is called after the promise is finished.

* **of(x, isPromise)** -- Creates Task object and executes with given function or value. The value can also be a Promise.

* **fork(reject, resolve)** -- Use this function at last to handle final data or error. Both parameters must be a function. The  *reject* is called when error is occurred otherwise *resolve* is called.

* **map(function)** -- Add a function to execute in the series of task. If no error is occurred, task functions are executed one after other is map sequence.

* **chain(function)** -- The first function in the chain can only take one parameter and the rest have to take two parameters. The first function takes only one parameter. It receives the input and returns some output. The second function takes two parameters. It receives the output from function one, the input, and returns some output.

* **ap(function)** -- Applicative functor (sometimes called simply applicative) is an upgraded version of the common functor we saw earlier. While functors use only single-parameter functions, applicative functors can use functions of any number of arguments. They also introduce the unit/return method which lifts a given type A into F[A]. (Note: Applicative functors also come with a bit different set of laws than ordinary functors; I will not go into them here as my intention is simply to explain the idea of applicative functors while leaving “mechanical” parts such as laws to your personal research, once you’re comfortable with the concept)

* **join()** -- join takes a container of containers and flattens it into a single container.