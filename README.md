# TASK(Cryptocurrency Exchanges)

## Requirements

Using the Coingecko [public API](https://www.coingecko.com/en/api), build an application that will serve as a directory of cryptocurrency exchanges. The main page should be a list with pagination of the first ten exchanges with some high-level information (name, country, URL, logo, trust rank).

When the user clicks on an exchange, show its details on a separate page. Included in those details should be the name, country, trust rank, logo, year of establishment, social media links, description, and a back-to-main-page button.

## Technology selection

1. `react` and `react-router` is necessary.
2. Use `fetch` to request the server, low version browsers(IE11, Chrome45) need to import polyfills, such as `isomorphic-fetch`. `Promise.prototype.finally` also needs polyfill.
3. Use some components in `ant-design` such as `<Table />` and `<List />` are used to speed up development.
4. Instead of `styled-components` as mentioned in task, I prefer `BEM` and `CSS Module` to avoid style conflicts. I wrote a simple blog([Why I dislike styled-components](https://linrz.me/2018/05/14/why-i-unlike-styled-components/)) to explain during my internship, why I don’t like it. Maybe some of these views are now outdated.

## Preview

Click [here](https://cryptocurrency-exchanges-linrz.vercel.app/) to preview online.

<img src="https://img.lastwhisper.cn/preview-pc-1.png" width="400px" />
<img src="https://img.lastwhisper.cn/preview-pc-2.png" width="400px">
<img src="https://img.lastwhisper.cn/preview-mobile-1.png" width="200px" >
<img src="https://img.lastwhisper.cn/preview-mobile-2.png" width="200px" >

## To be optimized

1. Due to time constraints, it is more appropriate to use `Typescript` to complete the task.
2. The data structure description of the failed request is not found in the API documentation of Coingecko. Request error handling needs to be improved.
3. `fetch` related logic should be abstracted into `useFetch` like `useSWR` to avoid repeated promise chain calling code.
4. The image returned by Coingecko is not based on the device DPI. Seeing the exchange logo on the Macbook screen is fuzzy.

## Author

**Cryptocurrency Exchanges** © [linrz](https://github.com/linrz)<br>
Authored and maintained by linrz. **For the confidentiality of recruitment, it will be deleted in a few days after you read it**.
