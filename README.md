# 開発背景
Typescriptの勉強を終えた後、腕試し用開発した。
# 技術スタック
next.js,typescript,supabase
# 工夫したところ
(1)useContextでデータに関するアクセスを一か所にまとめた
(2)apiの数が少ないため、直接にuseContextからapiを叩くことにした
(3)メイン画面と新規投稿画面の二つがありますが、個別にデザインを施すために、また、責務管理がしやすくなるようにメイン画面を「Header」「Left」「Right」にわけた。