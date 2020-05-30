BankAccount = {account_number = 0, holder_name = "", balance = 0.0}

function BankAccount:deposit(amount) 
    self.balance = self.balance + amount 
end

function BankAccount:withdraw(amount) 
    self.balance = self.balance - amount 
end

-- BankAccount.witdraw = function(self, amount) self.balance =
--     self.balance - amount end


-- function BankAccount:new(account_number, holder_name, balance)
--     local t = {}
--     setmetatable(t, self)
--     self.account_number = account_number
--     self.holder_name = holder_name
--     self.balance = balance
--     self.__index = self
--     return t
-- end

function BankAccount:new(t)
    t = t or {}
    setmetatable(t, self)
    self.__index = self
    return t
end

johns_account = BankAccount:new({
    account_number =  12345,
    holder_name = "John Coltrane"
})

print(johns_account.balance)