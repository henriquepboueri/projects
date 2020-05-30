math.randomseed(os.time())

for i = 1, 10 do
    rand = math.random(1, 10)
    print(i .. ":" .. rand .. ":" .. tostring(i == rand))
end
