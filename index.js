"use strict";

/**
 * ランダムな文字列を返す関数を定義
 */
const getRandomStr = (len) => {
  const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(Array(len))
    .map(() => s[Math.floor(Math.random() * s.length)])
    .join("");
};

/**
 * 対象のタスクのチェックボタン押下時の処理を定義
 */
const addCheckboxListener = (checkbox, id) => {
  checkbox.addEventListener("change", () => {
    const target = document.getElementById(id);
    const checkbox = target.querySelector(".checkbox");
    const name = target.querySelector(".name");

    if (checkbox.checked) {
      name.classList.add("completed");
    } else {
      name.classList.remove("completed");
    }
  });
};

/**
 * 対象のタスクを編集する関数を定義
 */
const addEditeListener = (button, id) => {
  button.addEventListener("click", () => {
    const content = prompt("修正後のタスク内容を入力してください。");

    // 入力チェック
    if (content === null) return;
    if (content === "") {
      alert("入力値がないため処理を中断しました。");
      return;
    }

    // タスク内容を変更
    const target = document.getElementById(id);
    const name = target.querySelector(".name");
    name.textContent = content;
  });
};

/**
 * 対象のタスクを削除する関数を定義
 */
const addDeleteListener = (tbody, button, id) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(id);
    tbody.removeChild(target);
    document.removeEventListener("click", button);
  });
};

/**
 * タスクを追加する関数を定義
 */
const addTask = (tbody, task) => {
  // templete要素をコピー
  const template = document.getElementById("taskTemplate");
  const clone = template.content.cloneNode(true);

  // HTML要素を取得
  const tr = clone.querySelector("tr");
  const name = clone.querySelector(".name");
  const checkbox = clone.querySelector(".checkbox");
  const editButton = clone.querySelector(".edit");
  const deleteButton = clone.querySelector(".delete");

  // trタグにid属性を設定
  tr.setAttribute("id", task.id);

  // タスク内容を設定
  name.textContent = task.name;

  addCheckboxListener(checkbox, task.id);

  // 編集ボタンのイベントを設定
  addEditeListener(editButton, task.id);

  // 削除ボタンのイベントを設定
  addDeleteListener(tbody, deleteButton, task.id);

  // DOMに追加
  tbody.appendChild(clone);
};

/**
 * 入力フォームでEnterを押下時の処理を定義
 */
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  // 現在のURLに対してフォーム内容の送信を防ぐために記述
  event.preventDefault();

  // 入力したタスク内容を取得
  const input = document.getElementById("input");
  const value = input.value;

  // タスク内容がない場合は下記以降の処理をしない
  if (!value) return;

  // タスク内容を追加
  const tbody = document.getElementById("tasks");
  const task = { id: getRandomStr(32), name: value };
  addTask(tbody, task);

  // 入力したタスク内容をクリア
  input.value = "";
});

/**
 * 「全てのタスクを削除」ボタンをクリック時の処理を定義
 */
const deleteAllButton = document.getElementById("deleteAll");
deleteAllButton.addEventListener("click", () => {
  const check = confirm("全てのタスクを削除します。よろしいですか？");
  if (check) {
    const tbody = document.getElementById("tasks");
    tbody.innerHTML = "";
  }
});
