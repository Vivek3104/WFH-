'use client';

interface WalletCardProps {
    balance: number;
    pendingWithdrawals: number;
    totalEarned: number;
}

const WalletCard = ({ balance, pendingWithdrawals, totalEarned }: WalletCardProps) => {
    return (
        <div className="flex flex-col gap-6 rounded-xl border border-primary/20 bg-[linear-gradient(135deg,var(--surface)_0%,#1a1a1a_100%)] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-sm text-muted">Available Balance</p>
                    <h2 className="text-4xl font-black tracking-[-0.06em] text-foreground">
                        <span className="mr-2 text-primary">Rs</span>
                        {balance.toLocaleString()}
                    </h2>
                </div>
                <div className="rounded-xl bg-primary/15 px-4 py-3 text-sm font-bold text-primary">
                    WALLET
                </div>
            </div>

            <div className="grid gap-4 rounded-xl bg-black/20 p-4 sm:grid-cols-2">
                <div>
                    <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-muted">Total Earned</p>
                    <p className="font-bold text-foreground">Rs {totalEarned.toLocaleString()}</p>
                </div>
                <div className="sm:text-right">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-muted">Pending</p>
                    <p className="font-bold text-amber-400">Rs {pendingWithdrawals.toLocaleString()}</p>
                </div>
            </div>

            <button className="inline-flex w-full items-center justify-center rounded-lg bg-[linear-gradient(90deg,var(--primary),#9333ea)] px-4 py-3 font-semibold text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition hover:-translate-y-0.5">
                Withdraw Funds
            </button>
        </div>
    );
};

export default WalletCard;
