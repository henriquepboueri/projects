math.randomseed(os.time())
-- TODO: create a Lua script that displays all integer numbers between 1000 and 1, in descending order.
-- for i = 1000, 1, -1 do print(i) end
-- for i = 1, 20 do print(math.random(1, 6)) end
--[[summary = {}
for i = 1, 20 do
    local num = math.random(1, 6)
    if (summary[num] ~= nil) then
        summary[num] = summary[num] + 1
    else
        summary[num] = 1
    end
end

for i in ipairs(summary) do print(i .. ": " .. summary[i]) end]]

-- local word = "henrique"
-- for i = #word, 1, -1 do print(string.sub(word, i, i)) end

local currency = 189
local notes = {100, 50, 20, 10, 5, 2}
local best = {}

while (true) do
    for i in ipairs(notes) do
        if currency >= notes[i] then
            best[notes[i]] = currency // notes[i]
            currency = currency % notes[i]
        end
    end
    if currency == 0 then break end
end

for key, value in pairs(best) do print(key .. ": " .. value) end