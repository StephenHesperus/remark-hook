# Remark Hook

This project is a hook runs after the `remark.js` to provide highlighting in
fenced code blocks.

The original project: [`remark.js`](https://github.com/gnab/remark).
`remark.js` is a fascinating tool to create presentation using an enhanced
version of markdown, go and check it out.

## Features

### Tile View Mode (New Feature)

Tile view mode shows all slides of a slide show. Click on a slide, the
slide show will go on from that slide. Use keyboard 'T' to toggle
between tile view mode and play mode.

### Highlighting in Code Blocks

#### 1. Highlight a whole line

Just change the first character of the line to `!`.

    ```python
    def say_hello():
    !   print('Hello, world!');
    ```

It will display as (the highlighting style can be customized):

<pre>
def say_hello():
<strong style="border: 1px solid red;">    print('Hello, world!');</strong>
</pre>

#### 2. Highlight tokens

Use this format: <strong>`` `highlighted tokens` ``</strong>.

    ```python
    `def` say_hello():
        print(`'Hello, world!', continued_highlight`);
    ```

It will display as:

<pre>
<strong>def</strong> say_hello():
    print(<strong>'Hello, world!', continued_highlight</strong>)
</pre>

#### 3. Use escaped back-quotes

Use this format: <strong>`` \`escaped back-quotes\` ``</strong>.


#### 4. Customize highlighting style

* highlighted lines
Define rules for the class `remark-code-line-highlighted`.

* highlighted tokens
Define rules for the class `remark-code-token-highlighted`.
